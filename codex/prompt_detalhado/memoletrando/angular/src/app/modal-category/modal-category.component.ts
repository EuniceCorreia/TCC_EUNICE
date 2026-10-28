import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Router } from '@angular/router';
import { Theme } from '../modules/themes/theme';
import { Inject } from '@angular/core';
import { Category } from '../modules/categories/category';
import { HelperService } from '../base/helper.service';

interface CategoryNode {
  id: number,
  name: string;
  children?: CategoryNode[];
  count_figures: number;
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  id: number,
  count_figures: number
}

@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.component.html',
  styleUrls: ['./modal-category.component.css']
})

export class ModalCategoryComponent {
  categories: any[] = [];

  private _transformer = (node: CategoryNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0 && node.children.some(c => c.count_figures),
      name: node.name,
      level: level,
      id: node.id,
      count_figures: node.count_figures
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Theme,
    private dialogRef: MatDialogRef<ModalCategoryComponent>,
    private helper_service: HelperService,
    private route: Router,
  ) {
    // this.dataSource.data = TREE_DATA;
  }

  async ngAfterViewInit() {
    await this.buildOptions();
    this.treeControl.expandAll();
  }

  async buildOptions() {
    if(this.data && this.data.categories) {
      this.dataSource.data = await this.buildRecursive(this.data.categories);
    }
  }

  buildRecursive(categories: Category[]) : any[] {
    if(!categories.length) return [];
    
    let _categories: any = [];

    categories.forEach(category => {
      var length = _categories.push({
        id: category.id,
        name: category.name,
        children: category.categories ? this.buildRecursive(category.categories) : [],
        count_figures: category.count_game_figures
      })

      _categories[length-1].count_figures +=  _categories[length-1].children.length ? _categories[length-1].children.map((c: any) => c.count_figures).reduce((a:any, b:any) => a + b) : 0;
    });

    return _categories;
  }


  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


  dismiss(category: CategoryNode){
    if(!category.id) {
      this.helper_service.toast('danger', 'Categoria inválida');
      return;
    }
    this.dialogRef.close(category);
  }

  close() {
    this.dialogRef.close(false);

  }
}
