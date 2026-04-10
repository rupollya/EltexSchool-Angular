import { Component } from '@angular/core';
import { Footer } from "../../components/footer/footer";
import { Header } from '../../components/header/header';
import { MainBlog } from '../../components/main-blog/main-blog';

@Component({
  selector: 'app-blog',
  imports: [MainBlog, Footer, Header],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog {

}
