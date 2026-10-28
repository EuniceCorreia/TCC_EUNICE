import { Pipe, PipeTransform } from "@angular/core";
import { ChatMessage } from "../modules/chat-messages/chat-message";

@Pipe({
    name: 'reorder_chat'
})
export class ReorderChatPipe implements PipeTransform {

    transform(array: ChatMessage[]): ChatMessage[] {
        array.sort((a: ChatMessage, b: ChatMessage): number => {
            var first = a.created_at;
            var second = b.created_at;
            return first.isBefore(second) ? -1 : first.isAfter(second) ? 1 : 0;
        });
        return array;
    }

}
