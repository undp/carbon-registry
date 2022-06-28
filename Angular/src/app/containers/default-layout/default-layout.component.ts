import { Component, OnDestroy, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { adminNavItems, nodalNavItems, userNavItems } from "../../_nav";
import { Router } from "@angular/router";
import { SetLeftFeature } from "ag-grid-community";
import {NavData} from "../../_nav";
@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems;
  public filteredNavItems = [];
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  public commonWhitelistMenu = ["Navigations","Dashboard"]; // menu common for all the user
   // nodal whiteList
  public nodalWhitelistMenu = [
    "GHG Inventory (Gas wise)",
    "GHG Inventory (Year wise)",
    "Mitigation Tracking",
    "Adaptation Tracking",
    "Finance Tracking",
    "SDG Tracking",
    "MRV Tracking"
  ];
  constructor(private router: Router, @Inject(DOCUMENT) _document?: any) {
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized =
        _document.body.classList.contains("sidebar-minimized");
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const accessString = localStorage.getItem("screenAccess");
    const userScreenAccess = accessString.split(",");
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const role = loggedInUser["role"];
    if(role.toLocaleLowerCase() != "admin") {
      this.filterMenuByRole(adminNavItems,role,userScreenAccess);
    }
    // this.removeParentNavWithZeroChildren(adminNavItems,null);
    this.filteredNavItems = adminNavItems;
    /* if (role && role.toLocaleLowerCase() === "admin") {
      this.navItems = adminNavItems;
      this.filteredNavItems = this.navItems;
    } else if (role) {
      if (role.toLocaleLowerCase() === "nodal") {
        this.navItems = nodalNavItems;
      } else {
        this.navItems = userNavItems;
      }
     // this.filterNavigationArray(userScreenAccess);
      this.filterMenuByRole(adminNavItems,role,userScreenAccess);
    } */
  }
  removeParentNavWithZeroChildren(adminNavItems: NavData[], parentMenu:NavData) {
    adminNavItems.forEach((nav,index)=> {
      if(nav.children && nav.children.length) {
        this.removeParentNavWithZeroChildren(nav.children,nav);
      } else {
        // loop in parent menu and check if all children has blank object then remove the parent
        if(parentMenu && parentMenu.children && parentMenu.children.length) {
          let noChildren = true;
          parentMenu.children.forEach(children=> {
            let keys = Object.keys(children);
            if(keys.length) {
              noChildren = false;
            }
          });
          if(noChildren) {
            parentMenu = {};
          }
        }
      }
    })
  }
  filterMenuByRole(adminNavItems: NavData[], role: string,userScreenAccess:string[]) {
    adminNavItems.forEach((nav,index)=> {
      // only apply filter for other than admin
      // if(role.toLocaleLowerCase() != "admin") {
        if(nav.children && nav.children.length) {
          // recurssion with children
          this.filterMenuByRole(nav.children,role,userScreenAccess);
        } else { // indivisual nav menu processing
          // if nav not found in whitelist and in screen access remove it
          if(role.toLocaleLowerCase() == "user" 
                && this.commonWhitelistMenu.indexOf(nav.name) == -1 
                && userScreenAccess.indexOf(nav.name) == -1) {
                  adminNavItems[index] = {};
          } else if(role.toLocaleLowerCase() == "nodal" && nav.name != "MY APPROVALS") {
            let whiteListMenu = this.commonWhitelistMenu.concat(this.nodalWhitelistMenu);
            if(whiteListMenu.indexOf(nav.name) == -1) {
              adminNavItems[index] = {};
            } else {
              // if menu prenset in whitelist then check access for report menus
              if(userScreenAccess.indexOf(nav.name) == -1) {
                adminNavItems[index] = {};
              }
            }
          }
        }
      // }
    })
  }

  logout() {
    localStorage.removeItem("tokenId");
    localStorage.removeItem("userDetails");
    localStorage.removeItem("screenAccess");
    localStorage.removeItem("loggedInUser");
    this.router.navigate(["login"]);
  }

  filterNavigationArray(userScreenAccess) {
    // filter level 0 , non nested elements
    this.filteredNavItems = [];
    // level 1 start
    this.navItems.forEach((level1Child, level1Index) => {
      if (
        ["Navigations", "Dashboard"].includes(level1Child["name"]) ||
        userScreenAccess.includes(level1Child["name"])
      ) {
        const filteredNavObj = Object.assign({}, level1Child);
        if (filteredNavObj["children"]) {
          filteredNavObj["children"] = filteredNavObj["children"].filter((v) =>
            userScreenAccess.includes(v["name"])
          );
          // if the children are visible
          if (filteredNavObj["children"].length > 0) {
            const level2Child = filteredNavObj["children"];
            if (level2Child["children"]) {
              level2Child["children"] = level2Child["children"].filter((v) =>
                userScreenAccess.includes(v["name"])
              );
              if (level2Child["children"].length > 0) {
                const level3Child = level2Child["children"];
                if (level3Child["children"]) {
                  level3Child["children"] = level3Child["children"].filter(
                    (v) => userScreenAccess.includes(v["name"])
                  );
                  if (level3Child["children"].length > 0) {
                    const level4Child = level3Child["children"];
                    if (level4Child["children"]) {
                      level4Child["children"] = level4Child["children"].filter(
                        (v) => userScreenAccess.includes(v["name"])
                      );
                      if (level4Child["children"].length > 0) {
                        const level5Child = level4Child["children"];
                        if (level5Child["children"]) {
                          level5Child["children"] = level4Child[
                            "children"
                          ].filter((v) => userScreenAccess.includes(v["name"]));
                          if (level5Child["children"].length > 0) {
                            const level6Child = level5Child["children"];
                            if (level6Child["children"]) {
                              level6Child["children"] = level6Child[
                                "children"
                              ].filter((v) =>
                                userScreenAccess.includes(v["name"])
                              );
                              if (level6Child["children"].length > 0) {
                                const level7Child = level6Child["children"];
                                if (level7Child["children"]) {
                                  level7Child["children"] = level7Child[
                                    "children"
                                  ].filter((v) =>
                                    userScreenAccess.includes(v["name"])
                                  );
                                  if (level7Child["children"].length > 0) {
                                    /*
                                Currently considering 7 levels of hierarchy, if more, we can add similar conditions in here
                                */
                                    this.filteredNavItems.push(filteredNavObj);
                                  }
                                } else {
                                  this.filteredNavItems.push(filteredNavObj);
                                }
                              }
                            } else {
                              this.filteredNavItems.push(filteredNavObj);
                            }
                          } else {
                            this.filteredNavItems.push(filteredNavObj);
                          }
                        } else {
                          this.filteredNavItems.push(filteredNavObj);
                        }
                      }
                    } else {
                      this.filteredNavItems.push(filteredNavObj);
                    }
                  } else {
                    this.filteredNavItems.push(filteredNavObj);
                  }
                } else {
                  this.filteredNavItems.push(filteredNavObj);
                }
              }
            } else {
              this.filteredNavItems.push(filteredNavObj);
            }
          }
        } else {
          this.filteredNavItems.push(filteredNavObj);
        }
      } else {
        // if the key is not present in access array
      }
    });
    // level 1 end
  }

  filterItems(childArr, userScreenAccess) {
    const filteredArr = childArr.filter(
      (ele) =>
        ["Navigations", "Dashboard"].includes(ele["name"]) ||
        ele["children"] ||
        (!ele["children"] && userScreenAccess.includes(ele["name"]))
    );
    return filteredArr;
  }

  deleteItemFromList(list, name) {
    const spliceIndex = list.findIndex((item) => item["name"] === name);
    list.splice(spliceIndex, 1);
  }

  checkForElementVisibility(element, userScreenAccess) {
    return userScreenAccess.includes(element["name"]);
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
