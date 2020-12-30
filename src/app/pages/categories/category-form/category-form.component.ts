import { switchMap } from 'rxjs/operators';
import { CategoryService } from './../shared/category.service';
import { Category } from './../shared/category.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
// import toastr from "toastr";
// import { error } from 'jquery';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction!: string;
  categoryForm!: FormGroup;
  pageTitle!: string;
  serverErrorMessage: string[] = [];
  submittingForm = false;
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();

  }

  ngAfterContentChecked(): void {

    this.setPageTitle();

  }

  private setPageTitle(): void {
    if (this.currentAction === 'new') {

      this.pageTitle = 'Cadastro de nova categoria';

    } else {

      const categoryName = this.category.name || '';
      this.pageTitle = 'Edição da nova: ' + categoryName;

    }
  }

  private setCurrentAction(): void {

    this.currentAction = this.route.snapshot.url[0].path === 'new' ? 'new' : 'edit';

  }

  private buildCategoryForm(): void {

    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength (2)]],
      description: [null]
    });

  }

  private loadCategory(): void {

    if (this.currentAction === 'edit') {

      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getByID(Number(params.get('id'))))
      )
      .subscribe(
        (category) => {
          this.category = category;
          this.categoryForm.patchValue(this.category);
        },
        (error: any) => {
          console.log('Erro no servidor => ' + error);
          alert('Ocorreu um erro no servidor, tente mais tarde');
        }
      );
    }

  }

}
