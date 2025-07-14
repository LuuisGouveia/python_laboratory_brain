import { Client } from "../entities/Client.js";
import { Output } from "../entities/Output.js";
import { Note } from "../entities/Note.js";
import { Job } from "../entities/Job.js";
import { ClientController } from "../controllers/ClientController.js";
import { OutuputController } from "../controllers/OutputController.js";
import { NoteController } from "../controllers/NoteController.js";
import { JobController } from "../controllers/JobController.js";
import { ClientPage } from "../views/ClientPage.js";
import { OutputPage } from "../views/OutputPage.js";
import { Home } from "../views/home.js";

const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close");

menuBtn.addEventListener("click", () => {
  showAndCloseMenu();
});
closeBtn.addEventListener("click", () => {
  showAndCloseMenu();
});

function showAndCloseMenu() {
  const menu = document.getElementById("nav");
  menu.classList.toggle("menu");
}

const content = document.getElementById("content");

document.addEventListener("DOMContentLoaded", () => {
  content.innerHTML = "";
  content.innerHTML = Home.html();
});

const homeBtn = document.getElementById("home");
homeBtn.addEventListener("click", () => {
  showAndCloseMenu();
  content.innerHTML = "";
  content.innerHTML = "";
});

const clientBtn = document.getElementById("newClient");
clientBtn.addEventListener("click", () => {
  showAndCloseMenu();
  content.innerHTML = "";
  content.innerHTML = ClientPage.html();
  ClientPage.dentistPlus();
  ClientPage.submit();
});

const outputBtn = document.getElementById("newOutput");
outputBtn.addEventListener("click", () => {
  showAndCloseMenu();
  content.innerHTML = "";
  content.innerHTML = OutputPage.html();
  OutputPage.loadSelectClients();
  OutputPage.submit();
});
