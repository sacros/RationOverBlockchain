import { Component, OnInit } from '@angular/core';
import { Stock } from '../../../model/Stock';
import { Web3Service } from '../../util/web3.service';
import { Router, ActivatedRoute } from '@angular/router';

import { ConversionService } from '../../service/conversion.service';
import { IpfsService } from '../../service/ipfs.service';

declare let require: any;
const rdsArtifacts = require('../../../../build/contracts/RDS.json');

@Component({
  selector: 'app-stockallocation',
  templateUrl: './stockallocation.component.html',
  styleUrls: ['./stockallocation.component.css']
})
export class StockallocationComponent implements OnInit {
  stock: Stock = new Stock();
  accounts: string[];
  RdsContract: any;
  shopkeeperAddresses: any;
  shopkeeperHashes = [];
  shopkeeperDetails = [{"UserId":0,"UserName":"--Select--"}];
  model = {
    amount: 5,
    receiver: '',
    balance: 0,
    account: ''
  };

  constructor(private web3Service: Web3Service, private router: Router, private IpfsService: IpfsService, private converionService: ConversionService) { }
  ngOnInit() {
    this.watchAccount();
    this.web3Service.artifactsToContract(rdsArtifacts)
      .then((RdsAbstraction) => {
        this.RdsContract = RdsAbstraction;
        this.getArrayData();
        // this.callTestMethod();
      });
  }

  async getArrayData() {
    console.log('calling method from contract');
    try {
      const deployedContract = await this.RdsContract.deployed();
      console.log(deployedContract);
      //console.log('Account', this.model.account);
      
      this.shopkeeperAddresses = await deployedContract.getShopkeeperAddresses.call();
      console.log(this.shopkeeperAddresses);
      // let tempHash = await deployedContract.
      for(let shopkeeperAddress of this.shopkeeperAddresses) {
        var shopkeeperHash  = await deployedContract.getShopkeeperDetails.call(shopkeeperAddress.toString());
        console.log(shopkeeperHash);
        
        if (shopkeeperHash[0]) {
           let shopkeeperData = this.IpfsService.get(shopkeeperHash[0]).then((result) => {
            result = JSON.parse(JSON.parse(result));
            result.address = shopkeeperAddress.toString();
            console.log('Hi ' + result.UserId);
            this.shopkeeperDetails.push(result);
          }).catch((err) => {
              console.log(err);
          })
        } else {
            console.log("Unable to retrieve hash");
        }
      }
      
      // for(var i =0;this.shopkeeperAddresses.length;i++){
      //   var shopkeperDetail = await deployedContract.getShopkeeperDetails.call(this.shopkeeperAddresses[i]);
      //   console.log(shopkeperDetail);
      //   this.shopkeeperHashes.push(shopkeperDetail[0]);
      // }
      // console.log(this.shopkeeperHashes);
      // console.log('Contract called');

    } catch (e) {
      console.log(e);
    }
  }

  // async getHashesData() {

  // }
  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
      console.log('Account', this.model.account);
      //  this.refreshBalance();
      ////////////
    });
  }
  stockAllocate(){
    this.addLimit();
  }
  hashValue : any;
  onChange(event) {
    this.hashValue = event.target.value;
  }

  async addLimit() {
    console.log('calling method from contract');
    try {
      const deployedContract = await this.RdsContract.deployed();
      console.log(deployedContract);
      //console.log('Account', this.model.account);
      //console.log(this.stock.ShopKeeperAddress);
      let callAlloc = await deployedContract.allocateResourceToShopkeeper(this.stock.Wheat, this.stock.Rice, this.stock.Kerosene, this.hashValue, {from: this.model.account});
      console.log('Contract called');
      
      if (callAlloc[0] == true) {
        alert(callAlloc[1]);
      }

      // @TODO: Redirect to appropriate page
      this.router.navigate(["/dashboard"]);

      //const metaCoinBalance = await deployedLand.getBalance.call(this.model.account);
    } catch (e) {
      console.log(e);
    }
  }
}