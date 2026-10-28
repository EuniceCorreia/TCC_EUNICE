import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalCategoryComponent } from '../../modal-category/modal-category.component';
import { UserService } from '../account/users/user.service';
import { ThemeService } from '../themes/theme.service';
import { HelperService } from 'src/app/base/helper.service';
import { Theme } from '../themes/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  themes: Theme[] = [];

  url_s3: string = this.user_service.url_s3;
  loading: boolean = false;

  constructor(
    public dialog: MatDialog,
    private helper_service: HelperService,
    private router: Router,
    private theme_service: ThemeService,
    private user_service: UserService
  ) {

  }
  
  ngOnInit() {
    this.getThemes();
  }

  getThemes() {
    this.loading = true;
    this.helper_service.loading();
    this.theme_service.get(['categories', 'image'], { active: 1, orderBy: 'order', main_categories: true }).then(
        (response: any) => {
            this.helper_service.loading_dismiss();
            this.loading = false;
          
            if(response.error) {
              this.helper_service.toast('danger', 'Alguma coisa deu errado');
              return;
            }

            this.themes = response.themes.map((t: Theme) => new Theme(t));
        },
        (error: any) => {
          this.loading = false;
          this.helper_service.loading_dismiss();
          this.helper_service.responseErrors(error);
        }
    )
  }

  openModalCategory(theme: Theme){
    const dialogRef = this.dialog.open(ModalCategoryComponent,{
      data: theme,
      width: '70%',
      height: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.id) {
        this.router.navigate(['/niveis/categoria/' + result.id]);
      }
    });
  }

  
  logoff() {
      this.user_service.logout();
  }
}
