import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core'
import { ToastrService } from 'ngx-toastr';
import {environment} from '../../../environments/environment'
import "../../speech/vad.js"
// import "../../speech/recorder.js"
import  "../../speech/speechMain.js"

@Component({
  selector: 'chat-input',
  template: 
  `
  <div class="chat-action-group">
    <div class="chat-input-text">
      <textarea type="text" class="chat-input-text" placeholder="Type message..."
      #message (keydown.enter)="onSubmit()" (keyup.enter)="message.value = ''" (keyup.escape)="dismiss.emit()"></textarea>
    </div>
    <div class="input-actions chat-input-button">
      <i class="fa fa-microphone" #recordBot (click)="onVoice()" data-toggle="tooltip" title="{{speechErrorMsg}}"></i>
      <i title="Main menu" class="fa fa-home" (click)="onHome()"></i>
      <i title="Send" class="fa fa-send send hide" style="display: inline;" (click)="onSubmit()"></i>
    </div>
  </div>
                  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./chat-input.component.css'],
})
export class ChatInputComponent implements OnInit {
  @Input() public buttonText = '↩︎'
  @Input() public focus = new EventEmitter()
  @Output() public send = new EventEmitter()
  @Output() public home = new EventEmitter()
  @Output() public voice = new EventEmitter()
  @Output() public dismiss = new EventEmitter()
  @ViewChild('message', { static: false}) message: ElementRef
  @ViewChild('recordBot', { static: false }) recordBot: ElementRef

  constructor(private toastrService: ToastrService){}

  recognition;
  rejectSpeech;
  speechErrorMsg="";
  options={};
  // host="https://demobot-api.speridian.com/"
  host=environment.apiURL
  speechToTextURL= this.host+"/webhooks/speechToText/webhook";
  textToSpeechURL= this.host+"/webhooks/textToSpeech/webhook";
  initializeSocket=false;
  speechRecog={}

  ngOnInit() {
    this.focus.subscribe(() => this.focusMessage())
    let options = {
      speechToTextCallback: this.speechToTextCallback.bind(this),
      textToSpeechCallback: this.textToSpeechCallback.bind(this),
      speechToTextURL: this.speechToTextURL,
      textToSpeechURL: this.textToSpeechURL,
      initializeSocket: this.initializeSocket
    };
  this.speechRecog = window['speechMain']['main'](options);
  }

  public focusMessage() {
    this.message.nativeElement.focus()
  }

  public getMessage() {
    return this.message.nativeElement.value
  }

  public clearMessage() {
    this.message.nativeElement.value = ''
  }

  onSubmit(isVoice=false) {
    // console.log("reached")
    const message = this.getMessage()
    if (message.trim() === '') {
      return
    }
    if(isVoice){
      this.voice.emit({bol:true});
    }
    this.send.emit({ message })
    this.clearMessage()
    this.focusMessage()
  }

  onHome(){
    this.home.emit({ message:"/restart" })
    this.clearMessage()
    this.focusMessage()
  }

  initSpeect(){
    window['speechMain']['startRecord']()
  }

  stopSpeech(){
    if(this.recognition && typeof(this.recognition.cancel) == "function"){
      this.recognition.cancel();
      this.speechErrorMsg = "";
      this.recognition = undefined;
    }
  }

  speechSynthosis(speakText){
    window['speechMain']['textToSpeech'](speakText)
  }

  onVoice() {
    let e = this.recordBot.nativeElement;
    if (e.classList.contains("recording")) {
      // stop recording
      e.classList.remove("recording");
      this.onSubmit(true)
      window['speechMain']['stopRecording'](false)
  } else {
      // start recording
      // if (!audioRecorder)
      //     return;
      e.classList.add("recording");
      this.initSpeect()
  }
}

speechToTextCallback(message, isSuccess=true){
  if(isSuccess == false || message['text'].toLowerCase() == "could not understand audio"){
    let e = this.recordBot.nativeElement;
    e.classList.remove("recording");
    if(message['text'].toLowerCase() == "could not understand audio"){
      message = "Could not understand audio"
    }
    this.toastrService.error(message);
    return
  }
this.message.nativeElement.value = message['text']
this.onVoice()
}

textToSpeechCallback(text, isSuccess){

}



}
