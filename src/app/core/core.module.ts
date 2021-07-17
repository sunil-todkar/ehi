import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { ContactService } from './services/contact.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, CoreRoutingModule],
  providers: [ContactService],
})
export class CoreModule {}
