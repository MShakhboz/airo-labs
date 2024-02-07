import filterByType from "./filterByType";
import { Filter, Message } from "./type";

const filterMessages = (messages: Message[], filter: Filter): Message[] => {
    return messages.filter((message) => filterByType(message, filter));
};

export default filterMessages;
