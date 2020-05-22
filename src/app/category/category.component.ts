import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService:CategoryService) { }
  categoryName:string='';
  dataStatus:string='Add';
  catId:string;
  categoriesData:Array<object>;
  color:Array<any> = ["#7c3c21", "#f17808", "#3797a4", "#79d70f", "#562349", "#b5076b", "#ffd31d", "#00005c", "#6f0000", "#ff427f", "#82c4c3", "#4d3e3e", "#120136", "#43d8c9", "#f78259" ];
  ngOnInit(): void {
    this.categoryService.getCat().subscribe(
      data => {
        this.categoriesData = data;
        // console.log(this.categoriesData);
      }
    );
  }

  
    onSubmit(f:NgForm){

      if(this.dataStatus == 'Add'){
        let randomNum: number = Math.floor(Math.random() * this.color.length);
        // console.log(randomNum); 
        let categoryData = {
          category : f.value.categoryName,
          colorCode: this.color[randomNum],
          todoCount: 0 
        };
        // console.log(f.value);
        // console.log(categoryData);
        this.categoryService.saveCat(categoryData);
        f.resetForm();
      }
      else if(this.dataStatus = 'Edit'){
        this.categoryService.updateCat(this.catId,f.value.categoryName);
        f.resetForm();
        this.dataStatus='Add';
      }     
      
    }
    onEdit(category: string, id:string){
        console.log(category);    
        this.categoryName = category; 
        this.dataStatus = 'Edit';
        this.catId = id;
    }

    onDelete(id:string){
      this.categoryService.deleteCat(id);
    }
  }