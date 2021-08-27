import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoiceRoutingModule } from './voice-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { SliderComponent } from './slider/slider.component';
import { SingerComponent } from './singer/singer.component';
import { FeaturedComponent } from './featured/featured.component';
import { ChartComponent } from './chart/chart.component';
import { CarouselComponent } from './carousel/carousel.component';
import { TagComponent } from './tag/tag.component';
import { FooterComponent } from './footer/footer.component';
import { ChartListComponent } from './chart/chart-list/chart-list.component';
import { ChartScreenComponent } from './chart/chart-screen/chart-screen.component';


@NgModule({
    declarations: [
        SidebarComponent,
        HeaderComponent,
        SliderComponent,
        SingerComponent,
        FeaturedComponent,
        ChartComponent,
        CarouselComponent,
        TagComponent,
        FooterComponent,
        ChartListComponent,
        ChartScreenComponent
    ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    SliderComponent,
    SingerComponent,
    FeaturedComponent,
    ChartComponent,
    CarouselComponent,
    TagComponent,
    FooterComponent
  ],
    imports: [
        CommonModule,
        VoiceRoutingModule
    ]
})
export class VoiceModule { }
