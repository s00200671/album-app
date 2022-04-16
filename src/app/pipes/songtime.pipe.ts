import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'songtime'
})
export class SongtimePipe implements PipeTransform {

  transform(seconds: number): string {
    // Pipes seconds into the format {m}:{s} m = minutes, s = seconds
    let timeString = "";
    if (seconds) {
      let mins = Math.floor(seconds / 60).toString();
      let sec = (seconds % 60).toString();
      timeString = (mins);
      timeString += (sec.length > 1) ? ":" + sec : ":0" + sec;
    }
    else {
      timeString = "0:00";
    }
    return timeString;
  }

}
