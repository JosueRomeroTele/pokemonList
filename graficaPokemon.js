google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawBasic);




function drawBasic() {
    
      var data = google.visualization.arrayToDataTable(arrayTabla);  
        
      var options = {
        title: 'Total Stats',
        chartArea: {width: '50%'},
      
      };

      var chart = new google.visualization.BarChart(document.getElementById('chart_div'));

      chart.draw(data, options);
    }