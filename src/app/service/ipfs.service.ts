declare let require: any;

const IPFS = require("nano-ipfs-store");
const ipfs = IPFS.at("https://ipfs.infura.io:5001");

import { Injectable } from '@angular/core';


@Injectable()
export class IpfsService {

  constructor() { }

  add(record: any): Promise<any> {
    var data = JSON.stringify(record);
   return ipfs.add(data)
  }
  get(recordHash: String): Promise<any> {
   return ipfs.cat(recordHash)
  }
}
