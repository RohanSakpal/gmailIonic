import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Haptics,ImpactStyle } from '@capacitor/haptics';
import { Animation, AnimationController, GestureController, IonItem } from '@ionic/angular';

const ANIMATION_BREAKPOINT = 70;
@Component({
  selector: 'app-swipe-item',
  templateUrl: './swipe-item.component.html',
  styleUrls: ['./swipe-item.component.scss'],
})
export class SwipeItemComponent implements OnInit {
@Input('email') m:any;
@ViewChild(IonItem, {read:ElementRef}) item:ElementRef;
@ViewChild('wrapper') wrapper:ElementRef;
@ViewChild('trash',{read:ElementRef}) trashIcon:ElementRef;
@ViewChild('archive',{read:ElementRef}) archiveIcon:ElementRef;
bigIcon = false;

trashAnimation : Animation;
archiveAnimation: Animation;

  constructor(private router:Router,private gestureCtrl:GestureController,
    private animationctrl:AnimationController) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.setupIconAnimation();
    const style = this.item.nativeElement.style;
    const moveGesture = this.gestureCtrl.create({
      el: this.item.nativeElement,
      gestureName: 'move',
      threshold: 0,
      onStart: ev=>{
        style.tansition ='';
      },
      onMove: ev=> {
        style.transform = `translate3d(${ev.deltaX}px,0,0)`;
        if(ev.deltaX > 0) {
          this.wrapper.nativeElement.style['background-color'] = 'var(--ion-color-primary)';
        } else if(ev.deltaX < 0) {
          this.wrapper.nativeElement.style['background-color'] = 'green';
        }

        if(ev.deltaX > ANIMATION_BREAKPOINT && !this.bigIcon) {
          this.animationTrash(true);
        } else if(ev.deltaX > 0 && ev.deltaX < ANIMATION_BREAKPOINT && this.bigIcon) {
          this.animationTrash(false);
        }

        if(ev.deltaX < -ANIMATION_BREAKPOINT && !this.bigIcon) {
          this.animationArchive(true);
        } else if(ev.deltaX < 0 && ev.deltaX > -ANIMATION_BREAKPOINT && this.bigIcon) {
          this.animationArchive(false);
        }
      },
      onEnd: ev=> {

      }
    });
    moveGesture.enable();
  }

  animationTrash(zoomIn) {
    this.bigIcon = zoomIn;
    if(zoomIn) {
      this.trashAnimation.direction('alternate').play();
    } else {
      this.trashAnimation.direction('reverse').play();
    }
    Haptics.impact({style: ImpactStyle.Light})
  }
  animationArchive(zoomIn) {
    this.bigIcon = zoomIn;
    if(zoomIn) {
      this.archiveAnimation.direction('alternate').play();
    } else {
      this.archiveAnimation.direction('reverse').play();
    }
    Haptics.impact({style: ImpactStyle.Light})
  }
  openDetails(id) {
    this.router.navigate(['tabs', 'mail', id]);
  }

  setupIconAnimation() {
    this.trashAnimation = this.animationctrl.create('trash-animation')
    .addElement(this.trashIcon.nativeElement)
    .duration(300)
    .easing('ease-in')
    .fromTo('transform','scale(1)','scale(2.5)');

    this.archiveAnimation = this.animationctrl.create('archive-animation')
    .addElement(this.trashIcon.nativeElement)
    .duration(300)
    .easing('ease-in')
    .fromTo('transform','scale(1)','scale(2.5)');
  }

  // removeMail() {
  //   console.log('remove:', id);
  //   this.emails = this.email.filter(email =>  email.id != id);
  // }
}
