export class Node {
  id;
  head;
  name;
  node;
  price;
  sorthead;
  childs = [];

  constructor(param) {
    this.id = param.id;
    this.head = param.head;
    this.name = param.name;
    this.node = param.node;
    this.price = param.price;
    this.sorthead = param.sorthead;
  }

  recursiveSortChilds = () => {
    this.childs.sort((a, b) => a.sorthead - b.sorthead);

    this.childs.forEach((child) => child.recursiveSortChilds());
  };

  recursiveAddChild = (param) => {
    if (param.head === null) {
      const child = new Node(param);
      this.childs.push(child);
      console.log("Fuck");
      return 1;
    }

    if (param.head === this.id) {
      const child = new Node(param);
      this.childs.push(child);
      return 1;
    }

    if (this.node === 0) {
      return 0;
    }

    const result = this.childs.map((child) => child.recursiveAddChild(param));

    if (result.indexOf(1) < 0) {
      return 0;
    }

    return 1;
  };

  recursiveGetHtml = () => {
    return `<div class="node${this.head ? "" : " without_margin"}">
      ${this.name
        ? `<div class="node_content">
          <span> ${this.name}</span>&nbsp
          ${this.price === 0 ? "" : `<span>(${this.price})</span>`}
        </div >`
        : ""
      }
      ${this.childs.map((child) => child.recursiveGetHtml()).join("")}
    </div > `;
  };

  static parseData = (data) => {
    const rootNode = new Node({ id: -1 });

    data.services.forEach((element) => {
      rootNode.recursiveAddChild(element);
    });

    rootNode.recursiveSortChilds();

    return rootNode.recursiveGetHtml();
  };
}
