import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { HelperService } from 'src/app/base/helper.service';
import { UserService } from '../account/users/user.service';
import { CategoryService } from '../categories/category.service';
import { Category } from '../categories/category';
import { User } from '../account/users/user';
import { GameSetting } from '../game-settings/game-setting';
import { Level } from '../levels/level';
import { LevelService } from '../levels/level.service';
import { GameSettingService } from '../game-settings/game-setting.service';

@Component({
  selector: 'app-level-page',
  templateUrl: './level-page.component.html',
  styleUrls: ['./level-page.component.css']
})
export class LevelPageComponent {
  public user: User | null = null;
  public category_id: number | null = null;
  public category: Category | null = null;
  public max_quantity_images: number = 2;
  public game_setting: GameSetting = new GameSetting;
  public levels: Level[] = [];
  public loading_levels: boolean = false;
  public loading_category: boolean = false;
  public loading_save: boolean = false;
  public url_s3 = this.user_service.url_s3;

  constructor(
    private category_service: CategoryService,
    private game_setting_service: GameSettingService,
    private helper_service: HelperService,
    private level_service: LevelService,
    private route: ActivatedRoute,
    private router: Router,
    private user_service: UserService
  ) {
    // this.router.getP
  }
  
  ngOnInit() {
    this.user = this.user_service.user;
    this.game_setting.user_id = this.user ? this.user.id : null;
    this.category_id = this.route.snapshot.params['id'] ? parseInt(this.route.snapshot.params['id']) : null;
    
    if(!this.category_id) {
      this.helper_service.toast('danger', 'Categoria não encontrada');
      this.router.navigate(['/temas']);
    }
  
    this.getCategory();
    this.getLevels();
  }

  getCategory() {
    this.loading_category = true;
    this.category_service.find(['theme.image'], { active: 1, id: this.category_id }).then(
        (response: any) => {
            this.loading_category = false;
            if(response.error) {
              this.helper_service.toast('danger', 'Alguma coisa deu errado');
              return;
            }
            this.category = new Category(response.category);
            this.game_setting.category_id = this.category.id;
            this.max_quantity_images = 10;
        },
        (error: any) => {
            console.log(error);
            // this.helper_service.responseErrors(error);
            this.loading_category = false;
            return this.router.navigateByUrl('/temas');
        }
    )
  }

  getLevels() {
    this.helper_service.loading();
      this.loading_levels = true;
      this.level_service.get([], {}).then(
        (response: any) => {
          this.loading_levels = false;
          this.helper_service.loading_dismiss();
          if(response.error) {
              this.helper_service.toast('danger', 'Alguma coisa deu errado');
              return;
            }
            this.levels = response.levels.map((l: Level) => new Level(l));
        },
        (error: any) => {
            console.log(error);
            this.helper_service.loading_dismiss();
            this.loading_levels = false;
            return this.router.navigateByUrl('/temas');
        }
    )
  }

  chooseLevel(level: Level) {
    this.game_setting.level_id = level.id;
    this.game_setting.level = level;
    this.game_setting.quantity_images = level.quantity_images;
  }

  saveGameSetting() {
    if(this.loading_save) return;
    this.loading_save = true;
    this.helper_service.loading();
    this.game_setting_service.store(this.game_setting).then(
        (response: any) => {
            this.loading_save = false;
            this.helper_service.loading_dismiss();
            if(response.error) {
              this.helper_service.toast('danger', 'Alguma coisa deu errado');
              return;
            }

            this.game_setting = new GameSetting(response.game_setting);
            
            this.router.navigateByUrl('game/' + this.game_setting.id);
        },
        (error: any) => {
            this.loading_save = false;
            this.helper_service.loading_dismiss();
            this.helper_service.responseErrors(error);
        }
    )
  }

  logoff() {
    this.user_service.logout();
  }

  backPage() {
    return this.router.navigateByUrl('temas');
  }

  setBackgroundImage() : Object {
    if(!this.category || !this.category.theme || !this.category.theme.image) return {};
    
    let style : Object = {
      'background-image': 'url('+ this.url_s3 + this.category.theme.image.path + ')',
      'position': 'absolute',
      width: '50%', 
      height: '100%',
      top: 0,
      left: 0,
      'background-size': 'cover',
      'filter': 'drop-shadow(2px 4px 6px black) blur(1px) grayscale(0.5) opacity(0.5)',
    };

    return style;

  }
}
