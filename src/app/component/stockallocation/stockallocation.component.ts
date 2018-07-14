import { Component, OnInit } from '@angular/core';
import { Stock } from '../../../model/Stock';
import { Web3Service } from '../../util/web3.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  model = {
    amount: 5,
    receiver: '',
    balance: 0,
    account: ''
  };

  constructor(private web3Service: Web3Service, private router: Router) { }
  ngOnInit() {
    this.watchAccount();
    this.web3Service.artifactsToContract(rdsArtifacts)
      .then((RdsAbstraction) => {
        this.RdsContract = RdsAbstraction;
        // this.callTestMethod();
      });
  }

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