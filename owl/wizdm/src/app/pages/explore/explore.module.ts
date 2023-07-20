import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { ContentRouterModule, RoutesWithContent } from '@wizdm/content';
import { GtagModule } from '@wizdm/gtag';
import { RedirectModule } from '@wizdm/redirect';
import { ReadmeModule } from '@wizdm/readme';
import { IconModule } from '@wizdm/elements/icon';
import { AvatarModule } from '@wizdm/elements/avatar';
import { MomentPipesModule } from '@wizdm/pipes/moment';
import { AuthGuardModule } from 'app/utils/auth-guard';
import { ValidProfile } from 'app/utils/user';
import { SidenavModule } from 'app/navigator/sidenav';
import { ExploreComponent } from './explore.component';

const routes: RoutesWithContent = [
  {
    path: '',
    content: 'explore',
    component: ExploreComponent,
    canActivate: [ ValidProfile ],
    children: [
      { path: '',       redirectTo: 'feed', pathMatch: 'full' },
      { path: 'feed',   loadChildren: () => import('./feed/feed.module').then(m => m.FeedModule) },
      { path: 'people', loadChildren: () => import('./people/people.module').then(m => m.PeopleModule) },
      { path: 'groups', loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule) },
      { path: 'q12022', loadChildren: () => import('./newsletterq1/newsletterq1.module').then(m => m.newsletterq1Module) },
      { path: 'q22022', loadChildren: () => import('./newsletterq2/newsletterq2.module').then(m => m.newsletterq2Module) },
      { path: 'communications', loadChildren: () => import('./communications/communications.module').then(m => m.CommunicationsModule) },
      { path: 'communicationsone', loadChildren: () => import('./communicationsone/communicationsone.module').then(m => m.CommunicationsoneModule) },
      { path: 'newcommunication', loadChildren: () => import('./newcommunication/newcommunication.module').then(m => m.NewcommunicationModule) },

      { path: 'capitalaccount2022', loadChildren: () => import('./newsletterq3/newsletterq3.module').then(m => m.newsletterq3Module) },
      { path: 'distribution2022', loadChildren: () => import('./newsletterq4/newsletterq4.module').then(m => m.newsletterq4Module) },
      { path: 'k12017', loadChildren: () => import('./k12018/k12018.module').then(m => m.k12018Module) },
      { path: 'k12018', loadChildren: () => import('./k12018/k12018.module').then(m => m.k12018Module) },
      { path: 'k12019', loadChildren: () => import('./k12019/k12019.module').then(m => m.k12019Module) },
      { path: 'k12020', loadChildren: () => import('./k12020/k12020.module').then(m => m.k12020Module) },
      { path: 'k12021', loadChildren: () => import('./k12021/k12021.module').then(m => m.k12021Module) },
      { path: 'k12022', loadChildren: () => import('./k12022/k12022.module').then(m => m.k12022Module) },

      { path: 'q22018', loadChildren: () => import('./q22018/q22018.module').then(m => m.q22018Module) },
      { path: 'q22017', loadChildren: () => import('./q22017/q22017.module').then(m => m.q22017Module) },
      { path: 'q22019', loadChildren: () => import('./q22019/q22019.module').then(m => m.q22019Module) },
      { path: 'q22020', loadChildren: () => import('./q22020/q22020.module').then(m => m.q22020Module) },
      { path: 'q22021', loadChildren: () => import('./q22021/q22021.module').then(m => m.q22021Module) },
      { path: 'q32017', loadChildren: () => import('./q32017/q32017.module').then(m => m.q32017Module) },
      { path: 'q32018', loadChildren: () => import('./q32018/q32018.module').then(m => m.q32018Module) },
      { path: 'q32019', loadChildren: () => import('./q32019/q32019.module').then(m => m.q32019Module) },
      { path: 'q32020', loadChildren: () => import('./q32020/q32020.module').then(m => m.q32020Module) },
      { path: 'q32021', loadChildren: () => import('./q32021/q32021.module').then(m => m.q32021Module) },
      { path: 'q32022', loadChildren: () => import('./q32022/q32022.module').then(m => m.q32022Module) },
      { path: 'q42022', loadChildren: () => import('./q42022/q42022.module').then(m => m.q42022Module) },
      
      { path: 'q12023', loadChildren: () => import('./q12023/q12023.module').then(m => m.Q12023Module) },


      { path: 'cas21q4', loadChildren: () => import('./cas21q4/cas21q4.module').then(m => m.Cas21q4Module) },

      { path: 'cas22q1', loadChildren: () => import('./cas22q1/cas22q1.module').then(m => m.Cas22q1Module) },
      { path: 'cas22q2', loadChildren: () => import('./cas22q2/cas22q2.module').then(m => m.Cas22q2Module) },
      { path: 'cas22q3', loadChildren: () => import('./cas22q3/cas22q3.module').then(m => m.Cas22q3Module) },
      { path: 'cas22q4', loadChildren: () => import('./cas22q4/cas22q4.module').then(m => m.Cas22q4Module) },
      { path: 'cas23q1', loadChildren: () => import('./cas23q1/cas23q1.module').then(m => m.Cas23q1Module) },

      { path: 'q42017', loadChildren: () => import('./q42017/q42017.module').then(m => m.q42017Module) },
      { path: 'q42018', loadChildren: () => import('./q42018/q42018.module').then(m => m.q42018Module) },
      { path: 'q42019', loadChildren: () => import('./q42019/q42019.module').then(m => m.q42019Module) },
      { path: 'q42020', loadChildren: () => import('./q42020/q42020.module').then(m => m.q42020Module) },
      { path: 'q42021', loadChildren: () => import('./q42021/q42021.module').then(m => m.q42021Module) },


      { path: 'q12018', loadChildren: () => import('./q12018/q12018.module').then(m => m.q12018Module) },
      { path: 'q12019', loadChildren: () => import('./q12019/q12019.module').then(m => m.q12019Module) },
      { path: 'q12017', loadChildren: () => import('./q12017/q12017.module').then(m => m.q12017Module) },
      { path: 'q12020', loadChildren: () => import('./q12020/q12020.module').then(m => m.q12020Module) },
      { path: 'q12021', loadChildren: () => import('./q12021/q12021.module').then(m => m.q12021Module) },
      { path: 'distribution2017', loadChildren: () => import('./distribution2017/distribution2017.module').then(m => m.distribution2017Module) },
      { path: 'distribution2018', loadChildren: () => import('./distribution2018/distribution2018.module').then(m => m.distribution2018Module) },
      { path: 'distribution2019', loadChildren: () => import('./distribution2019/distribution2019.module').then(m => m.distribution2019Module) },
      { path: 'distribution2020', loadChildren: () => import('./distribution2019/distribution2019.module').then(m => m.distribution2019Module) },
      { path: 'distribution2020', loadChildren: () => import('./distribution2020/distribution2020.module').then(m => m.distribution2020Module) },
      { path: 'distribution2021', loadChildren: () => import('./distribution2021/distribution2021.module').then(m => m.distribution2021Module) },
         { path: 'capitalcall2017', loadChildren: () => import('./capitalcall2017/capitalcall2017.module').then(m => m.capitalcall2017Module) },
      { path: 'capitalcall2018', loadChildren: () => import('./capitalcall2018/capitalcall2018.module').then(m => m.capitalcall2018Module) },
      { path: 'capitalcall2019', loadChildren: () => import('./capitalcall2019/capitalcall2019.module').then(m => m.capitalcall2019Module) },
      { path: 'capitalcall2020', loadChildren: () => import('./capitalcall2020/capitalcall2020.module').then(m => m.capitalcall2020Module) },
      { path: 'capitalcall2021', loadChildren: () => import('./capitalcall2021/capitalcall2021.module').then(m => m.capitalcall2021Module) },


      { path: 'capitalaccount2017', loadChildren: () => import('./capitalaccount2017/capitalaccount2017.module').then(m => m.capitalaccount2017Module) },
      { path: 'capitalaccount2018', loadChildren: () => import('./capitalaccount2018/capitalaccount2018.module').then(m => m.capitalaccount2018Module) },
      { path: 'capitalaccount2019', loadChildren: () => import('./capitalaccount2019/capitalaccount2019.module').then(m => m.capitalaccount2019Module) },
      { path: 'capitalaccount2020', loadChildren: () => import('./capitalaccount2020/capitalaccount2020.module').then(m => m.capitalaccount2020Module) },
      { path: 'capitalaccount2021', loadChildren: () => import('./capitalaccount2021/capitalaccount2021.module').then(m => m.capitalaccount2021Module) },
    ]
  }
];

@NgModule({
  declarations: [ ExploreComponent ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatBadgeModule,
    MatListModule,
    GtagModule,
    RedirectModule,
    ReadmeModule,
    IconModule,
    AvatarModule,
    AuthGuardModule,
    SidenavModule, 
    MomentPipesModule,
    ContentRouterModule.forChild(routes)
  ]
})
export class ExploreModule { }
