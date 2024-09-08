import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterModule} from "@angular/router";
import {Items} from "../../models/items.model";
import {ItemsService} from "../../services/items.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [
    RouterLink, RouterModule, CommonModule
  ],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css'
})
export class ItemDetailComponent implements OnInit{
  item?: Items;

  constructor(
    private router: Router,
    private itemService: ItemsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.itemService.getDetailItem(id).subscribe(data => {
        this.item = data;
      })
    }
  }
}
