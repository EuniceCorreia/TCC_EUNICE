import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, ModalController } from '@ionic/angular';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';

import { GameFigure } from '../game-figure';
import { Image } from '../../images/image';

import { GameFigureService } from '../game-figure.service';
import { HelperService } from 'src/app/base/helper.service';
import { SelectComponent } from 'src/app/components/select/select.component';
import { Theme } from '../../themes/theme';
import { ThemeService } from '../../themes/theme.service';
import { Level } from '../../levels/level';
import { LevelService } from '../../levels/level.service';
import { Category } from '../../categories/category';
import { CategoryService } from '../../categories/category.service';
import { User } from '../../account/users/user';
import { UserService } from '../../account/users/user.service';

interface CategoryNode {
    id: number,
    name: string;
    children?: CategoryNode[];
  }
  
/** Flat node with expandable and level information */
interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
    id: number,
    show_input: boolean,
    new_subcategory_name: string
}

@Component({
    selector: 'app-create',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
    @ViewChild(IonContent, { static: false }) content: IonContent;

    id: number;
    game_figure: GameFigure = null;
    editing: boolean = false;
    page = 'general';
    loading: boolean = false;
    saving: boolean = false;
    new_category: Category = new Category;
    show_new_category: boolean = false;
    user: User = null;

    // levels
    loading_levels: boolean = false;
    levels: Level[] = [];

    // themes
    loading_themes: boolean = false;
    themes: Theme[] = [];
    
    // categories
    loading_categories: boolean = false;
    categories: Category[] = [];

    url_s3: string = this.game_figure_service.url_s3;

    private _transformer = (node: CategoryNode, level: number) => {
      return {
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        level: level,
        id: node.id
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

    /** Map from flat node to nested node. This helps us finding the nested node to be modified */
    flatNodeMap = new Map<ExampleFlatNode, CategoryNode>();

    /** Map from nested node to flattened node. This helps us to keep the same object for selection */
    nestedNodeMap = new Map<CategoryNode, ExampleFlatNode>();

    constructor(
        private category_service: CategoryService,
        private game_figure_service: GameFigureService,
        private helper_service: HelperService,
        private level_service: LevelService,
        private modal_controller: ModalController,
        private route: ActivatedRoute,
        private router: Router,
        private theme_service: ThemeService,
        private user_service: UserService
    ) {
        this.game_figure = new GameFigure;
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
      this.user = this.user_service.user;
      this.game_figure = new GameFigure;
      this.id = this.id = this.route.snapshot.paramMap.get("id") ? parseInt(this.route.snapshot.paramMap.get("id")) : null;

      if (this.id) {
          this.editing = true;
          this.getGameFigure();
      } else {
        this.getThemes();
      }

      this.getLevels();
    }

    changeSegment(event: any) {
        this.page = event.detail.value;
    }

    getGameFigure() {
        this.helper_service.loading('Aguarde');

        this.game_figure_service.find(['image', 'level', 'category'], { id: this.id })
            .then(
                async (data: any) => {

                    this.game_figure = new GameFigure(data.game_figure);
                    if (!this.game_figure.image) {
                        this.game_figure.image = new Image();
                    }
                    this.getThemes();
                    this.helper_service.loading_dismiss();
                },
                (error: any) => {
                    this.helper_service.loading_dismiss();
                    this.helper_service.responseErrors(error)
                }
            );
    }

    getLevels() {
        if(this.loading_levels) return;
        this.loading_levels = true;
        
        this.level_service.get([],{}).then(
            (response: any) => {
                this.loading_levels = false;

                if(response.error) {
                  this.helper_service.toast('danger', 'Alguma coisa deu errado');
                  return;
                }
    
                this.levels = response.levels.map((l: Level) => new Level(l));
            },
            (error: any) => {
                this.helper_service.responseErrors(error);
                this.loading_levels = false;
            }
        )
      }

    async selectLevel() {
        if (this.loading_levels) return;
    
        const modal = await this.modal_controller.create({
          component: SelectComponent,
          componentProps: {
            title: 'Selecione um Nível',
            options: this.levels,
          },
        });
    
        await modal.present();
    
        const { data } = await modal.onDidDismiss();
    
        if (data) {
          this.game_figure.level_id = data.id;
          this.game_figure.level = data;
        }
    }

    getThemes() {
        if(this.loading_themes) return;
        this.loading_themes = true;

        this.theme_service.get(['categories'], { active: 1, orderBy: 'order' }).then(
            (response: any) => {
                this.loading_themes = false;

                if(response.error) {
                  this.helper_service.toast('danger', 'Alguma coisa deu errado');
                  return;
                }
    
                this.themes = response.themes.map((t: Theme) => new Theme(t));

                if(this.game_figure.category_id) {
                  this.game_figure.theme_id = this.game_figure.category.theme_id;
                  this.game_figure.theme = this.themes.find(t => this.game_figure.theme_id == t.id);
                  this.getCategories();
                }
            },
            (error: any) => {
                this.helper_service.responseErrors(error);
                this.loading_themes = false;
            }
        )
      }

    async selectTheme() {
        if (this.loading_themes) return;
    
        const modal = await this.modal_controller.create({
          component: SelectComponent,
          componentProps: {
            title: 'Selecione um Tema',
            options: this.themes,
          },
        });
    
        await modal.present();
    
        const { data } = await modal.onDidDismiss();
    
        if (data) {
          this.game_figure.theme_id = data.id;
          this.game_figure.theme = data;
          this.getCategories();
        }
    }

    getCategories() {
        if(this.loading_categories) return;
        this.loading_categories = true;

        this.category_service.get(['categories'], { theme_id: this.game_figure.theme_id, main: 1}).then(
            async (response: any) => {
                this.loading_categories = false;
                
                if(response.error) {
                  this.helper_service.toast('danger', 'Alguma coisa deu errado');
                  return;
                }
    
                this.categories = response.categories.map((c: Category) => new Category(c));

                await this.buildOptions();
                this.treeControl.expandAll();
            },
            (error: any) => {
                this.helper_service.responseErrors(error);
                this.loading_categories = false;
            }
        )
      }

    async selectCategory(node: CategoryNode) {
      this.game_figure.category = new Category(node);
      this.game_figure.category_id = node.id;

      this.treeControl.collapseAll();
    }

    async buildOptions() {
        if(this.categories) {
          this.dataSource.data = await this.buildRecursive(this.categories);
        }
      }
    
      buildRecursive(categories: Category[]) : any[] {
        if(!categories.length) return [];
        
        let _categories: any = [];
    
        categories.forEach(category => {
          _categories.push({
            id: category.id,
            name: category.name,
            children: category.categories ? this.buildRecursive(category.categories) : []
          })
        });
    
        return _categories;
      }
    
    
      hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    save() {
      if(!this.game_figure.image || (!this.game_figure.image.base64 && !this.game_figure.image.id)) {
        this.helper_service.toast('warning', 'É obrigatório incluir uma imagem!');
        return;
      }

        if (this.game_figure.id > 0) {
            this.update();
        } else {
            this.store();
        }
    }

    store() {
        this.saving = true;
        this.game_figure.user_id = this.user.id;
        this.game_figure_service.store(this.game_figure)
            .then(
                (data: any) => {
                    this.saving = false;

                    if (data.error) {
                        this.helper_service.toast('danger', data.error_message);
                        return false;
                    }
                    this.helper_service.toast('success', 'Salvo com sucesso!');
                    this.router.navigate(['game-figures'], {
                        state: { force: true }
                    });

                },
                (error: any) => {
                    this.saving = false;
                    this.helper_service.responseErrors(error);
                }
            );
    }

    update() {
        this.saving = true;
        this.game_figure_service.update(this.game_figure)
            .then(
                (data: any) => {
                    this.saving = false;
                    if (data.error) {
                        this.helper_service.toast('danger', data.error_message);
                        return false;
                    }

                    this.helper_service.toast('success', 'Alterado com sucesso!');
                    this.getGameFigure();
                },
                (error: any) => {
                    this.saving = false;
                    this.helper_service.responseErrors(error);
                }
            );
    }

    updateImage(event) {
        this.game_figure.image = event;
    }
    
    saveNewSubcategory(node: ExampleFlatNode) {
      let new_subcategory = new Category();
      new_subcategory.name = node.new_subcategory_name;
      new_subcategory.category_id = node.id;
      new_subcategory.main = false;
      this.saveNewCategory(new_subcategory);
    }

    saveNewCategory(category: Category) {
      category.theme_id = this.game_figure.theme_id;

      this.helper_service.loading('Salvando');
      this.category_service.store(category)
            .then(
                (data: any) => {
                    if (data.error) {
                        this.helper_service.toast('danger', data.error_message);
                        return false;
                    }
                    this.new_category = new Category;
                    this.show_new_category = false;
                    this.getCategories();
                },
                (error: any) => {
                    this.helper_service.responseErrors(error);
                }
            )
            .then(() => this.helper_service.loading_dismiss());
    }

    debug() {
        console.log(this.game_figure)
    }

}
