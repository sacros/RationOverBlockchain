import { Injectable } from '@angular/core';
import { Web3Service } from '../util/web3.service';

@Injectable()
export class ConversionService {

  constructor(private web3Service: Web3Service) {
    console.log(web3Service);
  }

  stringToBytes(str: String) {
    return this.web3Service.web3.utils.toHex(str);
  }
  bytesToString(byt: ByteString) {
    return this.web3Service.web3.utils.toAscii(byt);
  }

}
