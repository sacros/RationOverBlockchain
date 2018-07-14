import { Injectable } from '@angular/core';
import { Web3Service } from '../util/web3.service';

@Injectable()
export class UserService {

  constructor(private web3Service: Web3Service) {
    console.log(web3Service);
  }

  getUserAccount() {
    return this.web3Service.web3.eth.accounts.create();
  }

}
