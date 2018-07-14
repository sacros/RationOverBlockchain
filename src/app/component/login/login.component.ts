import { Component, OnInit } from '@angular/core';
import { Register } from '../../../model/Register';
import { Web3Service } from '../../util/web3.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConversionService } from '../../service/conversion.service';
import { IpfsService } from '../../service/ipfs.service';
import { UserService } from '../../service/user.service';

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
  
  constructor(private web3Service: Web3Service, private IpfsService: IpfsService, private converionService: ConversionService, private router: Router, private userService: UserService) { }

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
    });
  }

  addDependents(){
    this.count++;
    this.dependentAadhars.push(this.dependent);
  }

  registerAdmin(){
    this.userService.showLoader = true;
    //alert("called");
    var data = JSON.stringify(this.register);
    this.IpfsService.add(data).then((hash) => {
       // alert('hash: ' + hash);
       this.userService.showLoader = false;
        this.registerData(this.register, hash);
    })
  }

  createAccount() {
    var data = this.userService.getUserAccount();
    console.log("These are the details of a newly created account: ");
    console.log(data);
    this.userService.giveToken(this.model.account, data.address);
    this.userService.address = data.address;
    this.userService.privateKey = data.privateKey;
    return data;
  }

  async registerData(register, hash) {
    var callRegister;
    console.log('calling method from contract');
    try {
      const deployedContract = await this.RdsContract.deployed();
      console.log(deployedContract);
      // var account = this.userService.getUserAccount();
      //console.log('Account', this.model.account);
      // console.log(account);
      var account;
      if(register.UserType == 0){
        account = this.createAccount();
        callRegister = await deployedContract.registerInventoryManager(account.address, hash, {from: this.model.account});
      }
      else if( register.UserType == 1){
        account = this.createAccount();
        callRegister = await deployedContract.registerShopkeeper(account.address, hash, {from: this.model.account});
      }
      else if(register.UserType == 2){
        callRegister = await deployedContract.registerIndividual(register.UserId, register.UserCategory, hash, {from: this.model.account});
      }


      console.log('Contract called');
      //set user specific information in session
      var user = {
        name:register.UserName,
        email:'',
        uid:register.UserId,
        account:account,
        role :'DataEntry'
      };

      sessionStorage.setItem('currentUser', JSON.stringify(user));
      // @TODO: Redirect to appropriate page
      //this.userService.showLoader= false;
      this.router.navigate(["/dashboard"]);

      //const metaCoinBalance = await deployedLand.getBalance.call(this.model.account);
    } catch (e) {
      console.log(e);
    }
  }
}
