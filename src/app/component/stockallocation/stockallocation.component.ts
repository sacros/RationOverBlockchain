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
  commodity: Stock = new Stock();
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
}