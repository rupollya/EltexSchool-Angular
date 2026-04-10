import { Component } from '@angular/core';
import { MainContent } from "../../components/main-content/main-content";
import { Footer } from "../../components/footer/footer";
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-about-me',
  imports: [ MainContent, Footer, Header],
  templateUrl: './about-me.html',
  styleUrl: './about-me.scss',
})
export class AboutMe {

}
