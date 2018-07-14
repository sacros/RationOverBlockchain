import { Injectable } from '@angular/core';
import { Web3Service } from '../util/web3.service';

@Injectable()
export class UserService {

  address : any;
  privateKey : any;
  showLoader : any = false;

  //in : any;
  constructor(private web3Service: Web3Service) {
    console.log(web3Service);
  }

  getUserAccount() {
    return this.web3Service.web3.eth.accounts.create();
    // this.web3Service.web3.eth.sendTransaction({from: "0x27Fe0E12945B221C3771a083Ad575401e15Ef2A6", to: data.address, value: this.web3Service.web3.utils.toWei("1","ether")});
  }

  giveToken(fromAddress , toAddress) {
    console.log(this.web3Service);
    return this.web3Service.web3.eth.sendTransaction({from: fromAddress, to: toAddress, value: this.web3Service.web3.utils.toWei("2","ether")});
  }

}
