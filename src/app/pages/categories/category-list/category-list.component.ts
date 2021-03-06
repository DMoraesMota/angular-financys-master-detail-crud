import { Category } from './../shared/category.model';
import { CategoryService } from './../shared/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {

    this.categoryService.getAll().subscribe(
      categories => this.categories = categories,
      error => alert('Erro ao carregar a lista')
    )

  }

  deleteCategory(category: Category) {

    const mustDelete = confirm('Deseja realmente excluir esta categoria?');

    if (mustDelete) {
      this.categoryService.delete(Number(category.id)).subscribe(
        () => this.categories = this.categories.filter(element => element != category),
        () => alert('Erro ao tentar excluir a categoria')
      );
    }
  }

}
