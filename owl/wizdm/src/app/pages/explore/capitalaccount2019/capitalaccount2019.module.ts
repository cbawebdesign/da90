
import { NgModule, CUSTOM_ELEMENTS_SCHEMA 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatButtonModule } from '@angular/material/button';
import { IconModule } from '@wizdm/elements/icon';
import { ButtonChangerModule } from '@wizdm/elements/button';
import { GtagModule } from '@wizdm/gtag';
import { ActionbarModule } from 'app/navigator/actionbar';
import { ContentRouterModule, RoutesWithContent, ContentModule } from '@wizdm/content';
import { PostModule } from 'app/pages/explore/feed/post/post.module';
import { capitalaccount2019Component } from './capitalaccount2019.component';
import { FabModule } from 'app/navigator/fab/fab.module';
// import { DialogLoader } from 'app/dialogs';
// import { PdfViewerModule } from 'ng2-pdf-viewer';


const routes: RoutesWithContent = [
  {
    path: '',
    component: capitalaccount2019Component,
    content: 'explore-feed',
    children: [
      // { path: 'postdlg', loadChildren: () => import('../../../dialogs/post/post-dlg.module').then(m => m.PostModule), canActivate: [DialogLoader] },

    ]
  }
];

@NgModule({
  declarations: [ capitalaccount2019Component],
  imports: [
    CommonModule,
    FlexLayoutModule,
    // PdfViewerModule,
    
    MatButtonModule,
    IconModule,
    ButtonChangerModule,
    GtagModule,
    ActionbarModule,
    PostModule,
    FabModule,

    ContentRouterModule.forChild(routes)
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class capitalaccount2019Module { }
