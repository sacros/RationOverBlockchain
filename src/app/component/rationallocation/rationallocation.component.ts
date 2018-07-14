import { Component, OnInit } from '@angular/core';
import { Ration } from '../../../model/Ration';
import { ConversionService } from '../../service/conversion.service';
import { IpfsService } from '../../service/ipfs.service';
import { Web3Service } from '../../util/web3.service';
import { Router, ActivatedRoute } from '@angular/router';


declare let require: any;
const rdsArtifacts = require('../../../../build/contracts/RDS.json');

@Component({
  selector: 'app-rationallocation',
  templateUrl: './rationallocation.component.html',
  styleUrls: ['./rationallocation.component.css']
})
export class RationallocationComponent implements OnInit {
  rationIDNumber="1234567890";
  ration: Ration = new Ration();
  individualDetails:any;
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
  loadUserInformation(){
    this.addLimit();
  }

  async addLimit() {
    console.log('calling method from contract');
    try {
      const deployedContract = await this.RdsContract.deployed();
      console.log(deployedContract);
      //console.log('Account', this.model.account);
      
      let individualDetailsArr = await deployedContract.getIndividualDetails(this.ration.rationNumber, {from: this.model.account});
      var individualDetailsHash = individualDetailsArr[0];
      console.log('Contract called');
      if (individualDetailsHash) {
        this.IpfsService.get(individualDetailsHash).then((result) => {
         result = JSON.parse(result);
         this.individualDetails=JSON.parse(result);
         console.log(this.individualDetails);
       }).catch((err) => {
           console.log(err);
       })
     } else {
         console.log("Unable to retrieve land hash");
     }

    } catch (e) {
      console.log(e);
    }
  }
}
