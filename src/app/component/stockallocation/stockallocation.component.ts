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
  shopkeeperHashes: any;
  shopkeeperDetails: any;
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
        
        if (shopkeeperHash) {
           let shopkeeperData = this.IpfsService.get(shopkeeperHash).then((result) => {
            result = JSON.parse(result);
            this.shopkeeperDetails.push(result);
          }).catch((err) => {
              console.log(err);
          })
        } else {
            console.log("Unable to retrieve land hash");
        }
      }
      for(var i =0;this.shopkeeperAddresses.length;i++){
        var shopkeperDetail = await deployedContract.getShopkeeperDetails.call(this.shopkeeperAddresses[i]);
        console.log(shopkeperDetail);
        this.shopkeeperHashes.push(shopkeperDetail[0]);
      }
      console.log(this.shopkeeperHashes);
      console.log('Contract called');

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

  async addLimit() {
    console.log('calling method from contract');
    try {
      const deployedContract = await this.RdsContract.deployed();
      console.log(deployedContract);
      //console.log('Account', this.model.account);
      
      let callRegister = await deployedContract.allocateResourceToShopkeeper(this.stock.ShopKeeperAddress, this.stock.Wheat, this.stock.Rice, this.stock.Kerosene, {from: this.model.account});
      
      console.log('Contract called');

      // @TODO: Redirect to appropriate page
      this.router.navigate(["/dashboard"]);

      //const metaCoinBalance = await deployedLand.getBalance.call(this.model.account);
    } catch (e) {
      console.log(e);
    }
  }
}