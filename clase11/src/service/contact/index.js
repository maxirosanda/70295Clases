import ContactRepository from "./contact.repository.js"
import { Contact } from "../../dao/contact/factory.js"

export const contactService = new ContactRepository(new Contact())