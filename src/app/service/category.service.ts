import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private afs:AngularFirestore, private toastr:ToastrService) { }
  
  saveCat(data: any){
    this.afs.collection('categories').add(data).then(ref => {
      // console.log(data , "Category Added Successfully")
      this.toastr.success("New Category Added Successfully");
    });
  }

  getCat(){
    return this.afs.collection('categories').snapshotChanges().pipe(
      map((actions: any) => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data}
        })
      })
    )
  }
  updateCat(id:string,updatedCat:string){
    this.afs.doc('categories/'+id).update({category:updatedCat}).then( ()=>{
      this.toastr.success("Category Edited Successfully");
    })
  }
  deleteCat(id:string){
    this.afs.doc('categories/'+id).delete().then( ()=>{
      this.toastr.error("Category Deleted Successfully");
    });
  }
}
