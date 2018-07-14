import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Web3Service } from '../../util/web3.service';
import { IpfsService } from '../../service/ipfs.service';
import { ConversionService } from '../../service/conversion.service';
import { Router } from '@angular/router';
//import alertify from 'alertifyjs';

declare let require: any;
const rdsArtifacts = require('../../../../build/contracts/RDS.json');


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  details : any;
  accounts: string[];
  RdsContract: any;
  serviceData : any;  model = {
    amount: 5,
    receiver: '',
    balance: 0,
    account: ''
  };
  constructor(private userService : UserService,private web3Service: Web3Service, private IpfsService: IpfsService, private converionService: ConversionService, private router: Router) { }

  ngOnInit() {
    //alertify.alert("Address : "+ this.userService.address + "Private Key: "+ this.userService.privateKey);
    this.watchAccount();
    this.web3Service.artifactsToContract(rdsArtifacts)
      .then((RdsAbstraction) => {
        this.RdsContract = RdsAbstraction;
        this.serviceData = this.userService.getUserAccount();
        console.log(this.serviceData);
        // var yo = this.userService.giveToken();
        // console.log(yo);
        // this.callTestMethod();
      });
     this.details = JSON.parse(sessionStorage.getItem('currentUser'));
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
