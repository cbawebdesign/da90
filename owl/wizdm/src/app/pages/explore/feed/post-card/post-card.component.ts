import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { PostData } from '../post/post.component';
import { $animations } from './post-card.animation';
import * as IronWeb from "@ironcorelabs/ironweb";
const getJwt = async () => {
  const resp = await fetch(
    "https://us-central1-test7-8a527.cloudfunctions.net/generateJwt"
  );
  const text = await resp.text();
  return text;
};
@Component({
  selector: 'wm-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  animations: $animations
})
export class PostCardComponent implements OnInit {
  newdata: string;
  // pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  @Output() toggleLikes = new EventEmitter<boolean>(false);
  @Input() likes: Observable<number>;
  @Input() favorite: Observable<boolean>;

  @Input() data: PostData = {};

  @Input() userFirstName: string;
  @Input() userImage: string;

  constructor() { }


  async  ngOnInit() {

    // await IronWeb.initialize(getJwt, () => Promise.resolve("testpassword"));
    // const encryptedimage = new Uint8Array(atob(this.data.image).split("").map((c) => c.charCodeAt(0)));
    
  //   IronWeb.document.getDocumentIDFromBytes(encryptedimage).then(
  //     (documentId) => IronWeb.document.decrypt(documentId, encryptedimage)
  //   ).then(
  //     (decryptedpostdata) => {
  //       const decryptedtext = IronWeb.codec.utf8.fromBytes(decryptedpostdata.data);
  //       console.log(decryptedtext);
  //       this.newdata = decryptedtext;


  // });
  


}
}
