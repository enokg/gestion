$(document).ready(function () {
	//Only needed for the filename of export files.
	//Normally set in the title tag of your page.
	document.title = "Card View DataTable";
	// DataTable initialisation
	$("#example").DataTable({

		dom: '<"dt-buttons"Bf><"clear">lirtp',
		buttons: [
			"colvis",
			"copyHtml5",
			"csvHtml5",
			"excelHtml5",
			"pdfHtml5",
			"print"
		],
		//
		    buttons: true,
			destroy: true,
            responsive: true,
            select: true,
            stateSave: true,
            ordering:true,  
            paging: true,
		    autoWidth: true, 
			infoFiltered:true,        
            order: [[0, 'desc' ]],
            pageLength: 10,
            lengthMenu: 
            [
                [10, 25, 50, 100, -1],
                ['10', '25', '50', '100', 'All']
            ],

			language:
			{
                emptyTable:"Aucune élément trouvé",
                info: "Afficher _PAGE_ sur _PAGES_",
                infoEmpty: "Aucune donnée disponible",
                loadingRecords: "Chargement...",
                processing : "En cours...",
                search: "Rechercher",
                zeroRecords: "L'élément recherché n'existe pas",
                decimal: ',',
                thousands: '.',
                lengthMenu:     "Afficher _MENU_ entrées",
                infoFiltered:   "(filtré sur _MAX_ entrées au total)",
                //url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/de-DE.json',
                
                paginate :
                    {
                    first: "Premier",
                    last: "Dernier",
                    next: "Suivant",
                    previous: "Précédent",
                    }
             }, 
			 columnDefs: 
			 [{
					 targets: [1, 2, 4],
					 className: 'all',
				 },
				 {
					 targets: [0],
					 visible: true, //hide kolom pertama/0
					 searchable: true,
				 },
				 
				 {
					 targets: [2],
					 className: 'dt-body-center',
					 "render": function(data, type, row, meta) {
						 if (type === 'display' && data.length > 5) 
							 {
							  data = '<a href="https://wa.me/62' + data + '?text=' + row[3] + '" target="_blank">' + '<i class="fa-brands fa-whatsapp" style="font-size:20px;color:green"></i>' + '</a>';
							 }
						 return data;
					 }
				 },
	   
				 
			 ],

			//
		initComplete: function (settings, json) {
			$(".dt-buttons .btn-group").append(
				'<a id="cv" class="btn btn-primary" href="#">CARD VIEW</a>'
			);
			$("#cv").on("click", function () {
				if ($("#example").hasClass("card")) {
					$(".colHeader").remove();
				} else {
					var labels = [];
					$("#example thead th").each(function () {
						labels.push($(this).text());
					});
					$("#example tbody tr").each(function () {
						$(this)
							.find("td")
							.each(function (column) {
								$("<span class='colHeader'>" + labels[column] + ":</span>").prependTo(
									$(this)
								);
							});
					});
				}
				$("#example").toggleClass("card");
			});
		}
	});
});
