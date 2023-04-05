import { Component } from '@angular/core';
import { ChatgptService } from './chatgpt.service';

interface msg {
  txt?:string;
  type: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ang-chatgpt';

  conversation: { text: string, sender: 'user' | 'bot' }[] = [];

  inputText:string = '';

  chatHistory: msg[] = [];

  urlImage = '';
  
  constructor(private chatgptSv: ChatgptService){ }

  makeRequest(){

    if(this.inputText == '') return;
    this.chatHistory.push({type: 'request', txt: this.inputText})
    //this.conversation.push({ text: this.inputText, sender: 'user' });

    this.chatgptSv.getCompletion(this.inputText).subscribe(response => {

      console.log(response.data.choices[0].text);
      this.chatHistory.push({type: 'response', txt: response.data.choices[0].text});
      this.inputText = '';
    });

  }

  getImage(){

    if(this.inputText == '') return;
    this.chatHistory.push({type: 'request', txt: this.inputText});

    this.chatgptSv.getImage(this.inputText).subscribe(response => {

      this.urlImage = response.data[0].url;
      this.inputText = '';
      //console.log(response.data[0]);
    });

  }



}
