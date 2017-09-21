// import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
//
//
// declare const cornerstone;
//
//
// @Directive({
//   selector: '[cornerstone]',
// })
//
// export class CornerstoneDirective{
//
//   element: any;
//
//   imageList = [];
//
//   currentIndex = 0;
//
//
//   @Input('image')
//   set image(imageData: any) {
//     // console.log('setting image data:', imageData);
//
//     if (imageData) {
//       // console.log(imageData);
//
//       if (!this.imageList.filter(img => img.imageId === imageData.imageId).length) {
//         this.imageList.push(imageData);
//       }
//
//       if (imageData.imageId) {
//         this.displayImage(imageData);
//       }
//       // console.log(this.imageList);
//     }
//   }
//
//   constructor(public elementRef: ElementRef) {
//     console.log("construct")
//     this.element = this.elementRef.nativeElement;
//     console.log("elementRef", this.elementRef.nativeElement);
//     cornerstone.enable(this.element);
//   }
//
//   @HostListener('window:resize', ['$event'])
//   onResize(event) {
//     cornerstone.resize(this.element, true);
//   }
//
//   @HostListener('mousewheel', ['$event'])
//   onMouseWheel(event) {
//     event.preventDefault();
//
//     const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
//     // console.log(event);
//
//     if (delta > 0) {
//       this.currentIndex++;
//       if (this.currentIndex > this.imageList.length) {
//         this.currentIndex = this.imageList.length - 1;
//       }
//     } else {
//
//       this.currentIndex--;
//       if (this.currentIndex < 0) {
//         this.currentIndex = 0;
//       }
//     }
//
//     this.image = this.imageList
//       .filter(img => img.imageId === `wadouri:http://localhost:4200/assets/dicom/im${this.currentIndex}`)[0];
//
//
//   }
//   //
//   // ngOnInit() {
//   //   console.log("OnInit");
//   //
//   //   // // Retrieve the DOM element itself
//   //   // this.element = this.elementRef.nativeElement;
//   //   // console.log("elementRef Oninit", this.elementRef.nativeElement);
//   //   //
//   //   // // Enable the element with Cornerstone
//   //   // cornerstone.enable(this.element);
//   // }
//
//   displayImage(image) {
//     console.log("image",this.element,image);
//     cornerstone.displayImage(this.element, image);
//   }
//
//
//   // cornerstone.displayImage(element, image);
//   // cornerstoneTools.mouseInput.enable(element);
//   // cornerstoneTools.mouseWheelInput.enable(element);
//   //
//   // // Enable all tools we want to use with this element
//   // cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
//   // cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
//   // cornerstoneTools.zoom.activate(element, 4); // zoom is the default tool for right mouse button
//   // cornerstoneTools.zoomWheel.activate(element); // zoom is the default tool for middle mouse wheel
//
// }
