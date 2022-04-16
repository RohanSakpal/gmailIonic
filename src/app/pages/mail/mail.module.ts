import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MailPageRoutingModule } from './mail-routing.module';

import { MailPage } from './mail.page';
import { ShareDirectivesModule } from 'src/app/directives/share-directives.module';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MailPageRoutingModule,
    ShareDirectivesModule,
    SharedComponentsModule
  ],
  declarations: [MailPage]
})
export class MailPageModule {}
