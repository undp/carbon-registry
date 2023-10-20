# Operational Manual - Carbon Registry

## Table of Contents

- [1. Introduction](#introduction)
- [2. General Functionality](#general-functionality)
  - [2.1. User Onboarding](#user-onboarding)
    - [2.1.1. Permissions](#permissions)
    - [2.1.2. Add New Organisation](#add-new-organisation)
    - [2.1.3. View Organisations](#view-organisations)
    - [2.1.4. Deactivate Organisations (Carbon Registry Only)](#deactivate-organisations-carbon-registry-only)
    - [2.1.5. Reactivate Organisations (Carbon Registry Only)](#reactivate-organisations-carbon-registry-only)
    - [2.1.6. Add New User](#add-new-user)
    - [2.1.7. View Users](#view-users)
    - [2.1.8. Edit Users](#edit-users)
    - [2.1.9. Delete Users](#delete-users)
- [3. Carbon Registry](#carbon-registry)
  - [3.1. Permissions](#permissions-1)
  - [3.2. Authorise or Reject Programmes](#authorise-or-reject-programmes)
    - [3.2.1. Authorise Programme](#authorise-programme)
    - [3.2.2. Reject Programme](#reject-programme)
  - [3.3. Issue Credits for Programmes](#issue-credits-for-programmes)
  - [3.4. Certify Programme](#certify-programme)
  - [3.5. Revoke Certification](#revoke-certification)
  - [3.6. Transfer Credits](#transfer-credits)
    - [3.6.1. Request Credits](#request-credits)
    - [3.6.2. Send Credits](#send-credits)
  - [3.7. Retire Credits](#retire-credits)
    - [3.7.1. Cross Border transfer](#cross-border-transfer)
    - [3.7.2. Legal Action](#legal-action)
    - [3.7.3. Other](#other)
  - [3.8. Accept or Reject Transfer Requests](#accept-or-reject-transfer-requests)
    - [3.8.1. Accept Transfer Request](#accept-transfer-request)
    - [3.9. Reject Transfer Request](#reject-transfer-request)
  - [3.10. Recognise or Not Recognise Retire Requests](#recognise-or-not-recognise-retire-requests)
    - [3.10.1. Recognise Retire Request](#recognise-retire-request)
    - [3.10.2. Not Recognise Retire Request](#not-recognise-retire-request)
  - [3.11. Cancel Retire or Transfer Requests](#cancel-retire-or-transfer-requests)

# Introduction

This documentation includes a description of the system functions and
capabilities of the National Carbon Registry 

The National Carbon Registry is a platform to quantify the emissions
reductions as carbon credits that can be traded.

# General Functionality

## **User Onboarding**

The Organisation and User levels in the system are as follows

![image](https://github.com/undp/carbon-registry/assets/109564/83fd88c8-90a1-4b39-9dcb-a96b0a00910d)

## **Permissions**

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 29%" />
<col style="width: 37%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Permission Type</strong></th>
<th><strong>User/Organisation Type</strong></th>
<th><strong>Authorised User Role</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td colspan="3"><strong>Add New Organisation</strong></td>
</tr>
<tr class="even">
<td>Government</td>
<td></td>
<td><em>*Default organisation created by the system</em></td>
</tr>
<tr class="odd">
<td>Other organisations</td>
<td><p>Programme Developer</p>
<p>Certifier</p></td>
<td><p>Root (Government)</p>
<p>Admin (Government)</p></td>
</tr>
<tr class="even">
<td colspan="3"><strong>View Organisations</strong></td>
</tr>
<tr class="odd">
<td>All Organisations</td>
<td><p>Government</p>
<p>Programme Developer</p>
<p>Certifier</p></td>
<td>All Users</td>
</tr>
<tr class="even">
<td colspan="3"><strong>Delete Organisation</strong></td>
</tr>
<tr class="odd">
<td colspan="3">N/A</td>
</tr>
<tr class="even">
<td colspan="3"><strong>Edit Organisation</strong></td>
</tr>
<tr class="odd">
<td colspan="3">N/A</td>
</tr>
<tr class="even">
<td colspan="3"><strong>Add New Users</strong></td>
</tr>
<tr class="odd">
<td>Government</td>
<td>Root</td>
<td><em>*Default user created by the system</em></td>
</tr>
<tr class="even">
<td>Government</td>
<td><p>Admin</p>
<p>Manager</p>
<p>Viewer</p></td>
<td><p>Root (Government)</p>
<p>Admin (Government)</p></td>
</tr>
<tr class="odd">
<td>Other Organisations</td>
<td>Initial Admin</td>
<td><p>Root (Government)</p>
<p>Admin (Government)</p></td>
</tr>
<tr class="even">
<td>Other Organisations</td>
<td><p>Admin</p>
<p>Manager</p>
<p>Viewer</p></td>
<td><p>Admin (Organisation)</p>
<p><em>* Can add users to Own Organisation only</em></p></td>
</tr>
<tr class="odd">
<td colspan="3"><strong>View Users</strong></td>
</tr>
<tr class="even">
<td>Government</td>
<td><p>Admin</p>
<p>Manager</p>
<p>Viewer</p></td>
<td>All Government Users</td>
</tr>
<tr class="odd">
<td>Other Organisations</td>
<td><p>Admin</p>
<p>Manager</p>
<p>Viewer</p></td>
<td>All Government Users</td>
</tr>
<tr class="even">
<td>Own organisation users</td>
<td><p>Admin</p>
<p>Manager</p>
<p>Viewer</p></td>
<td>All users of the Organisation</td>
</tr>
<tr class="odd">
<td colspan="3"><strong>Edit Users</strong></td>
</tr>
<tr class="even">
<td>Government</td>
<td><p>Admin</p>
<p>Manager</p>
<p>Viewer</p></td>
<td><p>Root (Government)</p>
<p>Admin (Government)</p></td>
</tr>
<tr class="odd">
<td>Other Organisations</td>
<td><p>Admin</p>
<p>Manager</p>
<p>Viewer</p></td>
<td>Admin (Organisation)</td>
</tr>
<tr class="even">
<td>Own account</td>
<td colspan="2"><p>All users should be able to edit their own
account</p>
<p>Non-editable fields – Email, Role</p></td>
</tr>
<tr class="odd">
<td colspan="3"><strong>Delete Users</strong></td>
</tr>
<tr class="even">
<td>Government</td>
<td><p>Admin</p>
<p>Manager</p>
<p>Viewer</p></td>
<td><p>Root (Government)</p>
<p>Admin (Government)</p></td>
</tr>
<tr class="odd">
<td>Other Organisations</td>
<td><p>Admin</p>
<p>Manager</p>
<p>Viewer</p></td>
<td>Admin (Organisation)</td>
</tr>
</tbody>
</table>

- **Only in the Carbon Registry the following functionality is
  available**

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 29%" />
<col style="width: 37%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="3"><strong>Deactivate Organisation</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Government</td>
<td></td>
<td><em>*Cannot Deactivate Government</em></td>
</tr>
<tr class="even">
<td>Other organisations</td>
<td><p>Programme Developer</p>
<p>Certifier</p></td>
<td><p>Root (Government)</p>
<p>Admin (Government)</p>
<p>Manager (Government)</p></td>
</tr>
<tr class="odd">
<td colspan="3"><strong>Reactivate Organisation</strong></td>
</tr>
<tr class="even">
<td>Deactivated organisations</td>
<td><p>Programme Developer</p>
<p>Certifier</p></td>
<td><p>Root (Government)</p>
<p>Admin (Government)</p>
<p>Manager (Government)</p></td>
</tr>
</tbody>
</table>

## **Add New Organisation**

1.  Go to ![image](https://github.com/undp/carbon-registry/assets/109564/f3185531-8139-4557-b3ab-354759b7d574) Organisations from the navigation bar

2.  Click ![image](https://github.com/undp/carbon-registry/assets/109564/8cdc3d91-276b-47fa-8b7d-e1da9d78dfe3)

3.  Fill in the Organisation Details and click next ![image](https://github.com/undp/carbon-registry/assets/109564/c9263f0f-c4d0-40dc-bcae-39667f4f0c9e)

4.  Fill in the Organisation Admin Details and click submit ![image](https://github.com/undp/carbon-registry/assets/109564/5f7de1f4-72b1-4a39-b6d5-068fede09abd)


## **View Organisations**

1.  Go to ![image](https://github.com/undp/carbon-registry/assets/109564/f3185531-8139-4557-b3ab-354759b7d574) Organisations from the navigation bar

## **Deactivate Organisations (Carbon Registry Only)**

1.  Go to ![image](https://github.com/undp/carbon-registry/assets/109564/f3185531-8139-4557-b3ab-354759b7d574) Organisations from the navigation bar

2.  Click on an active organisation

3.  Click deactivate  ![image](https://github.com/undp/carbon-registry/assets/109564/362aa7fe-50b1-446a-bdd3-75b62cf3b217)

## **Reactivate Organisations (Carbon Registry Only)**

1.  Go to ![image](https://github.com/undp/carbon-registry/assets/109564/f3185531-8139-4557-b3ab-354759b7d574) Organisations from the navigation bar

2.  Click on a deactivated organisation

3.  Click reactivate ![image](https://github.com/undp/carbon-registry/assets/109564/29baa149-2565-4f9d-b7b3-d501bc6c1786)

## **Add New User**

1.  Go to ![image](https://github.com/undp/carbon-registry/assets/109564/ab3cfcc8-06be-4e32-82b3-91ed433c0ca2) Users from the navigation bar

2.  Click add user ![image](https://github.com/undp/carbon-registry/assets/109564/2b6dc5ca-680a-4945-8aad-2f8243048305)

3.  Fill the form and click submit ![image](https://github.com/undp/carbon-registry/assets/109564/5f7de1f4-72b1-4a39-b6d5-068fede09abd)

## **View Users**

1.  Go to ![image](https://github.com/undp/carbon-registry/assets/109564/ab3cfcc8-06be-4e32-82b3-91ed433c0ca2) Users from the navigation bar

## **Edit Users**

To edit other users

1.  Go to ![image](https://github.com/undp/carbon-registry/assets/109564/ab3cfcc8-06be-4e32-82b3-91ed433c0ca2) Users from the navigation bar

2.  Click ![image](https://github.com/undp/carbon-registry/assets/109564/19272618-37f8-4bea-8d33-0f4d90b9d4c7) at the right corner of a user

3.  Click Edit ![image](https://github.com/undp/carbon-registry/assets/109564/1642c3be-9e67-41c1-b57d-8446f060f98c)

4.  Edit the required details and click update  ![image](https://github.com/undp/carbon-registry/assets/109564/f84bb6bf-a124-4ca7-a209-a8ff39766188)

To edit own account

1.  Click on the profile image on the top right corner

2.  Click Edit ![image](https://github.com/undp/carbon-registry/assets/109564/1642c3be-9e67-41c1-b57d-8446f060f98c)

3.  Edit the required details and click update ![image](https://github.com/undp/carbon-registry/assets/109564/f84bb6bf-a124-4ca7-a209-a8ff39766188)

## **Delete Users**

1.  Go to ![image](https://github.com/undp/carbon-registry/assets/109564/ab3cfcc8-06be-4e32-82b3-91ed433c0ca2) Users from the navigation bar

2.  Click [image](https://github.com/undp/carbon-registry/assets/109564/19272618-37f8-4bea-8d33-0f4d90b9d4c7) at the right corner of a user

3.  Click Delete

4.  Add remarks and click delete ![image](https://github.com/undp/carbon-registry/assets/109564/db355c47-d294-4479-9d63-d30f5ee4f1bf) 

# Carbon Registry

## **Permissions**

- View Only users have the same views but cannot perform any actions

<table>
<colgroup>
<col style="width: 23%" />
<col style="width: 16%" />
<col style="width: 60%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Organisation Type</strong></th>
<th><strong>User Role</strong></th>
<th><strong>Authorised functionalities</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Government</td>
<td><p>Root</p>
<p>Admin</p>
<p>Manager</p></td>
<td><ul>
<li><p>View programmes</p></li>
<li><p>Authorise or Reject Programmes</p></li>
<li><p>Issue Credits</p></li>
<li><p>Revoke Certification</p></li>
<li><p>Request Credit Transfer from any authorised programme</p></li>
<li><p>Request to Send Credits from any programme</p></li>
<li><p>Cancel Transfer Requests initiated by own organisation</p></li>
<li><p>Retire any authorised programme</p></li>
<li><p>Recognise or not recognise retire requests</p></li>
</ul></td>
</tr>
<tr class="even">
<td>Certifier</td>
<td><p>Admin</p>
<p>Manager</p></td>
<td><ul>
<li><p>View authorised programmes</p></li>
<li><p>Certify Programme</p></li>
<li><p>Revoke Certification</p></li>
</ul></td>
</tr>
<tr class="odd">
<td>Programme Developer</td>
<td><p>Admin</p>
<p>Manager</p></td>
<td><ul>
<li><p>View all authorised programmes and own programmes</p></li>
<li><p>Request Credit Transfer from any authorised programme</p></li>
<li><p>Send Credits owned by own organisation</p></li>
<li><p>Accept or Reject any Transfer request made for credits owned by
own organisation</p></li>
<li><p>Cancel Transfer Requests initiated by own organisation</p></li>
<li><p>Request to retire own credits internationally</p></li>
<li><p>Cancel retire requests initiated by own organsiation</p></li>
</ul></td>
</tr>
</tbody>
</table>

## **Authorise or Reject Programmes**

1.  Go to Programmes from the navigation bar

![image](https://github.com/undp/carbon-registry/assets/109564/1c208e98-e28f-4f6d-8793-a6f1bd8500dc)

2.  Click on the programme name of any pending state programme

![image](https://github.com/undp/carbon-registry/assets/109564/72f21a18-31d9-4167-9a6a-b7831df60204)

## **Authorise Programme**

1.  Click Authorise

![image](https://github.com/undp/carbon-registry/assets/109564/214bc87e-c45d-414f-9f58-44b452f97c60)

2.  Click Authorise
![image](https://github.com/undp/carbon-registry/assets/109564/d3f7a49e-735a-429c-8e93-0e0243a480b7)

## **Reject Programme**

1.  Click Reject
![image](https://github.com/undp/carbon-registry/assets/109564/b586ab57-c9ae-4764-9ecb-5cf90d395cde)

2.  Add Remarks and click Reject

![image](https://github.com/undp/carbon-registry/assets/109564/0ef232a3-cc54-4294-be71-bf9c6a932245)

## **Issue Credits for Programmes**

1.  Go to Programmes from the navigation bar

![image](https://github.com/undp/carbon-registry/assets/109564/7b0c6987-d836-4e7c-8c3d-36619d168347)

2.  Click on the programme name of any authorised programme

![image](https://github.com/undp/carbon-registry/assets/109564/b98ab2cd-30b7-4e72-8d03-4934b695a8db)

3.  Click issue

![image](https://github.com/undp/carbon-registry/assets/109564/7514dc53-d573-4858-9252-7671354b381a)

4.  Enter the number of credits to be issued and click issue

![image](https://github.com/undp/carbon-registry/assets/109564/475db9c3-2717-424a-956c-43123d968ac7)

## **Certify Programme**

1.  Go to Programmes from the navigation bar

![image](https://github.com/undp/carbon-registry/assets/109564/dafe883e-3f41-444b-a7ab-668d71a67444)

2.  Click the programme name of any if the programmes

![image](https://github.com/undp/carbon-registry/assets/109564/632d21c7-c559-4b09-adcc-ded6296e3d96)

3.  Click certify

![image](https://github.com/undp/carbon-registry/assets/109564/a792215a-1d41-4cea-9081-d67bd1243b1d)

4.  Click certify

![image](https://github.com/undp/carbon-registry/assets/109564/57d9063f-588c-4163-b5d9-05dadecdfb22)

## **Revoke Certification**

1.  Go to Programmes from the navigation bar

![image](https://github.com/undp/carbon-registry/assets/109564/1a9f4b12-c493-40c4-9192-20068407f0e5)

2.  Click on the programme name of a certified programme 
![image](https://github.com/undp/carbon-registry/assets/109564/9bc13014-dac5-4f28-9437-90044f3bd2e4)

3.  Click revoke certification 
![image](https://github.com/undp/carbon-registry/assets/109564/c62f5c0d-546e-4afa-982f-b379144a199c)

4.  Add remarks and click revoke

![image](https://github.com/undp/carbon-registry/assets/109564/5fb76219-9413-4ee2-bbe8-299288ed6aca)

## **Transfer Credits**

1.  Go to Programmes from the navigation bar

![image](https://github.com/undp/carbon-registry/assets/109564/f5cf4feb-9f8a-4d4b-9664-18063c127452)

2.  Click on the programme name of any authorised programme with a credit balance

![image](https://github.com/undp/carbon-registry/assets/109564/33e41149-4bfa-4eb2-94bb-4e33a628ec47)


## **Request Credits**

1.  Click request

![image](https://github.com/undp/carbon-registry/assets/109564/135f8b42-4c59-42aa-9f47-136ca91fe929)

2.  Enter the number of credits and click request

![image](https://github.com/undp/carbon-registry/assets/109564/db892faf-b2ca-46c2-9015-1a0aefab73e9)

## **Send Credits**

1.  Click send

![image](https://github.com/undp/carbon-registry/assets/109564/2e40d9b5-759c-43d1-96fb-f181fb639fd3)


2.  Select the recipient, enter the number of credits to be sent and click send

![image](https://github.com/undp/carbon-registry/assets/109564/934e5b73-77b3-4219-b7ae-2032b97f88e3)


## **Retire Credits**

1.  Go to Programmes from the navigation bar

![image](https://github.com/undp/carbon-registry/assets/109564/cdd768ef-4b6b-41c1-9355-858a25852ae8)

2.  Click on the programme name of any authorised programme with a credit balance

![image](https://github.com/undp/carbon-registry/assets/109564/d946dca9-431f-4f8d-bd3f-856782672be1)

3.  Click on retire

![image](https://github.com/undp/carbon-registry/assets/109564/d22340c0-8d0e-437e-9188-e6aad6227eae)

## **Cross Border transfer**

1.  Select the country, enter the company, number of credits and remarks, check the condition and click retire
![image](https://github.com/undp/carbon-registry/assets/109564/a5a64d60-c272-47ae-a104-c45a3d03dc5a)

## **Legal Action**

1.  Enter remarks, check the condition and click retire

![image](https://github.com/undp/carbon-registry/assets/109564/910aeff2-938e-4aad-8262-eb3f03d21931)

## **Other**

1.  Enter remarks, check the condition and click retire

![image](https://github.com/undp/carbon-registry/assets/109564/3ff25677-b7ef-46c0-97ee-32eb248335f4)

## **Accept or Reject Transfer Requests**

1.  Go to ![image](https://github.com/undp/carbon-registry/assets/109564/0ad61818-b86b-4048-ace0-db6c241cb56f) from the navigation bar

![image](https://github.com/undp/carbon-registry/assets/109564/491225f1-ba2d-4c00-9dc7-ad73820e6518)

2.  Click ![image](https://github.com/undp/carbon-registry/assets/109564/7186fe51-f67c-4ebb-9966-97952a267b2e) at the right corner of a pending transfer request

![image](https://github.com/undp/carbon-registry/assets/109564/dbcd9855-62b6-4383-ba1c-9c229bdf1025)


## **Accept Transfer Request**

1.  Click Accept

![image](https://github.com/undp/carbon-registry/assets/109564/6a127c78-8332-43cf-a899-e404a9782272)

2.  Check the condition and proceed

![image](https://github.com/undp/carbon-registry/assets/109564/1081af87-a3d2-4d7a-aac6-22bf980dcb9a)

## **Reject Transfer Request**

1.  Click Reject

![image](https://github.com/undp/carbon-registry/assets/109564/2195d765-f839-4067-a9e1-67ccb1813de7)

2.  Add remarks, check the condition and click reject

![image](https://github.com/undp/carbon-registry/assets/109564/01bf43fd-486e-43e3-8d79-30691016a08b)

## **Recognise or Not Recognise Retire Requests**

1.  Go to ![image](https://github.com/undp/carbon-registry/assets/109564/0ad61818-b86b-4048-ace0-db6c241cb56f) Transfers from the navigation bar
    ![image](https://github.com/undp/carbon-registry/assets/109564/3beb37d4-b860-47f1-8f56-18bde3c775e5)

2.  Click ![image](https://github.com/undp/carbon-registry/assets/109564/7186fe51-f67c-4ebb-9966-97952a267b2e) at the right corner of a pending retire request

![image](https://github.com/undp/carbon-registry/assets/109564/422cef2a-43f8-4fbd-abdb-4feda9434c44)

## **Recognise Retire Request**

1.  Click Recognise

![image](https://github.com/undp/carbon-registry/assets/109564/13fdda14-a76e-472d-a332-aaced013d131)

2.  Check condition and click Recognise

![image](https://github.com/undp/carbon-registry/assets/109564/3565bcd4-f835-44a8-87c6-66bc193a756d)

## **Not Recognise Retire Request**

1.  Click Not Recognise

![image](https://github.com/undp/carbon-registry/assets/109564/0ba47ff0-5c43-4789-aa93-8052d06d5d6b)

2.  Add remakrs, check condition and click not recognise

![image](https://github.com/undp/carbon-registry/assets/109564/810f4918-b339-4e99-9001-62f96e589a70)

## **Cancel Retire or Transfer Requests**

1.  Go to ![image](https://github.com/undp/carbon-registry/assets/109564/0ad61818-b86b-4048-ace0-db6c241cb56f) Transfers from the navigation bar 
![image](https://github.com/undp/carbon-registry/assets/109564/643fa061-4d41-4765-b2b6-12a355227629)

2.  Click![image](https://github.com/undp/carbon-registry/assets/109564/7186fe51-f67c-4ebb-9966-97952a267b2e) at the right corner of the pending request

![image](https://github.com/undp/carbon-registry/assets/109564/af3a872f-8d15-414b-aa6f-ac271fa5df0c)

3.  Click cancel

![image](https://github.com/undp/carbon-registry/assets/109564/a5a3e5b9-1e79-47bf-b19f-921b75db02e3)

4.  Add remarks, check the condition and click proceed

![image](https://github.com/undp/carbon-registry/assets/109564/e0379915-061d-43bb-a7d5-4a716ac8912d)
