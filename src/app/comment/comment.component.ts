import { Component, Input } from '@angular/core';
import { Comment } from '../models/item';
import { TimeagoModule } from 'ngx-timeago';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [TimeagoModule, RouterLink],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input() comment!: Comment;
}
