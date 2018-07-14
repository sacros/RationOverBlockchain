import { Component, OnInit } from '@angular/core';
import { Register } from '../../../model/Register';
import { Web3Service } from '../../util/web3.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConversionService } from '../../service/conversion.service';
import { IpfsService } from '../../service/ipfs.service';

declare let require: any;
const rdsArtifacts = require('../../../../build/contracts/RDS.json');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  dependent = {'addharNo':''};
  dependentAadhars = [];
  noOfDependents:number;
  count : number =0;
  url: string;
  register: Register = new Register();
  accounts: string[];
  RdsContract: any;
  model = {
    amount: 5,
    receiver: '',
    balance: 0,
    account: ''
  };

  constructor(private web3Service: Web3Service, private IpfsService: IpfsService, private converionService: ConversionService, private router: Router) { }

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

  addDependents(){
    this.count++;
    this.dependentAadhars.push(this.dependent);
    // document.getElementById("tab").append(row);
    //         $("#tab").append(row);
  }

  registerAdmin(){
    alert("called");
    var data = JSON.stringify(this.register);
    this.IpfsService.add(data).then((hash) => {
        alert('hash: ' + hash);
        this.registerData(this.register, hash);
    })
  }

  async registerData(register, hash) {
    console.log('calling method from contract');
    try {
      const deployedContract = await this.RdsContract.deployed();
      console.log(deployedContract);
      //console.log('Account', this.model.account);
      
      //let callRegister = await deployedContract.registerIndividual(this.register.UserCategory, this.commodity.Wheat, this.commodity.Rice, this.commodity.Kerosene, {from: this.model.account});
      
      console.log('Contract called');

      // @TODO: Redirect to appropriate page
      this.router.navigate(["/dashboard"]);

      //const metaCoinBalance = await deployedLand.getBalance.call(this.model.account);
    } catch (e) {
      console.log(e);
    }
  }

}
