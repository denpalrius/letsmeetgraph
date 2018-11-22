import { Component, OnInit } from '@angular/core';
import { GraphService } from 'src/app/services/graph.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  constructor(private graphService: GraphService) {}

  ngOnInit() {}
}
