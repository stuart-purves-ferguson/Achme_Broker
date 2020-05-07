# Achme_Broker

Site: URL: http://ec2-18-189-13-71.us-east-2.compute.amazonaws.com/build/

The site is built using React and is hosted on an AWS (Windows) server

The site should auto load the JSON file.

The site is responsive

#Sorting: 

- Clicking on the table headers sorts the data
- All the columns sort alpha-numerically (customer address discounts the building number and sorts by the street name or whatever text is after the number)
- Sorting on desktop only currently

#Filtering

 - It currently only filters by premiums that are "£3000 or more" OR premiums that are "less than £3000"
 - Filtering is by the radio buttons
 
 #Adding, deleting and modifying records
 
 - Add records by filling out the empty text boxes at the bottom of the grid of textboxes and the clicking the "Add Policy" button
 - Delete by clicking the red delete button next to eaxch row of the grid
 - Modify existing records by editing the text in any of the existing text boxes - this then edits the value held in the React "state" object
 
 #Reset
 
 - This resets to the original data (for testing)
