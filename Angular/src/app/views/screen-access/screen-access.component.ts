import { SelectionModel } from "@angular/cdk/collections";
import { FlatTreeControl } from "@angular/cdk/tree";
import { Component, Injectable, Input } from "@angular/core";
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from "@angular/material/tree";
import { BehaviorSubject } from "rxjs";
/**
 * Node for to-do item
 */
export class MRVScreenNode {
  children: MRVScreenNode[];
  item: string;
}

/** Flat to-do item node with expandable and level information */
export class MRVScreenFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}
const TREE_DATA = {
  // "Dashboard" : null,
  GHG: {
    // "GHG Config": null,
    /* "GHG Inventory": {
      Energy: {
        "Reference Approach": null,
        "Sectoral Approach": {
          "Energy Industries": [
            "Natural Gas",
            "Fugitive Oil",
            "Electricity Generation",
            "Production of Solid Fuels",
          ],
          Manufacturing: null,
          Transport: null,
          Others: null,
        },
      },
      IPPU: {
        "Mineral Industry": [
          "Cement Production",
          "Lime Production",
          "Glass Production",
          "Carbonate Production",
        ],
        "Chemical Industry": ["Soda Ash"],
        "Non- Energy Products from fuel and solvent use": [
          "Lubricant Use",
          "Solvent Use",
        ],
        "Products uses as substitutes for ozone depleting substances": [
          "Refrigeration and Air Conditioning",
        ],
      },
      AFOLU: {
        Livestock: ["Enteric Fermentation", "Manure Management"],
        Land: [
          "Forest Land",
          "Cropland",
          "Grassland",
          "Wetland",
          "Settlements",
          "Other Lands",
        ],
        "Aggregate sources and non CO2 emissions sources on land": [
          "Emissions from Biomass Burning",
          "Indirect N2O emissions from Manure Management",
          "Indirect Emissions",
          "Direct Emissions",
          "Rice Cultivation",
          "Liming",
          "Urea Application",
        ],
      },
      Waste: [
        "Solid Waste Disposal",
        "Biological Treatment of Solid Waste",
        "Incineration and Open Burning of Waste",
        "Wastewater Treatment and Discharge",
      ],
    }, */
    "GHG File Upload": null,
  },
  "NDC Actions": null,
  "Mitigation Actions": ["Mitigation Project Information", "Mitigation Monitoring Information"],
  "Adaptation Actions": ["Adaptation Project Information", "Adaptation Monitoring Information"],
  "Climate Finance": [
    "Climate Finance Project Information",
    "Climate Finance Monitoring Information",
  ],
  "SDG Assessment": ["SDG Assessment Project Information", "SDG Assessment Monitoring Information"],
  /* Database: {
    Energy: ["Emission Factor - Fuel", "Fugitive Emissions"],
    IPPU: ["Emission Factor - IPPU", "GWP Database"],
    AFOLU: ["Livestock Population", "Emission Factor - Livestock"],
    Waste: ["Population"],
  }, */
  Reports: {
    "GHG Inventory": ["GHG Inventory (Gas wise)","GHG Inventory (Year wise)"],
    "Mitigation Tracking":null,
    "Adaptation Tracking":null,
    "Finance Tracking":null,
    "SDG Tracking":null,
    "MRV Tracking":null,
  },
  /* "User List":null,
  "My Approval":null */
};
/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<MRVScreenNode[]>([]);

  get data(): MRVScreenNode[] {
    return this.dataChange.value;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `MRVScreenNode` with nested
    //     file node as children.
    const data = this.buildFileTree(TREE_DATA, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `MRVScreenNode`.
   */
  buildFileTree(obj: { [key: string]: any }, level: number): MRVScreenNode[] {
    return Object.keys(obj).reduce<MRVScreenNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new MRVScreenNode();
      node.item = key;

      if (value != null) {
        if (typeof value === "object") {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: MRVScreenNode, name: string) {
    if (parent.children) {
      parent.children.push({ item: name } as MRVScreenNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: MRVScreenNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }
}

/**
 * @title Tree with checkboxes
 */
@Component({
  selector: "app-screen-access",
  templateUrl: "./screen-access.component.html",
  styleUrls: ["./screen-access.component.scss"],
  providers: [ChecklistDatabase],
})
export class ScreenAccessComponent {
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<MRVScreenFlatNode, MRVScreenNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<MRVScreenNode, MRVScreenFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: MRVScreenFlatNode | null = null;

  /** The new item's name */
  newItemName = "";

  treeControl: FlatTreeControl<MRVScreenFlatNode>;

  treeFlattener: MatTreeFlattener<MRVScreenNode, MRVScreenFlatNode>;

  dataSource: MatTreeFlatDataSource<MRVScreenNode, MRVScreenFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<MRVScreenFlatNode>(
    true /* multiple */
  );

  constructor(private _database: ChecklistDatabase) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<MRVScreenFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    _database.dataChange.subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  getLevel = (node: MRVScreenFlatNode) => node.level;

  isExpandable = (node: MRVScreenFlatNode) => node.expandable;

  getChildren = (node: MRVScreenNode): MRVScreenNode[] => node.children;

  hasChild = (_: number, _nodeData: MRVScreenFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: MRVScreenFlatNode) =>
    _nodeData.item === "";

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: MRVScreenNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.item === node.item
        ? existingNode
        : new MRVScreenFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable =
      node.children && node.children.length > 0 ? true : false;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: MRVScreenFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => {
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: MRVScreenFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some((child) =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: MRVScreenFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach((child) => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: MRVScreenFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: MRVScreenFlatNode): void {
    let parent: MRVScreenFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: MRVScreenFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: MRVScreenFlatNode): MRVScreenFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /** Save the node to database */
  saveNode(node: MRVScreenFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this._database.updateItem(nestedNode!, itemValue);
  }

  setNodeSelection(selectedNodes) {
    if (this.treeControl && selectedNodes && selectedNodes.length > 0) {
      for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
        if (selectedNodes.includes(this.treeControl.dataNodes[i]["item"])) {
          this.checklistSelection.select(this.treeControl.dataNodes[i]);
          this.treeControl.expand(this.treeControl.dataNodes[i]);
        }
      }
    }
  }
}

/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
