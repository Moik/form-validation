var errors;

$(document).ready(function() {

	$("input:not([type=checkbox]), textarea").focus(function () {
		$(this).parent().addClass("focus");
	});
	$("input, textarea").blur(function () {
		$(this).parent().removeClass("focus");
	});

	$("button[type=reset]").click(function() {
		$("input, textarea").removeClass("valid invalid");
		$("input, textarea").parent().removeClass("valid invalid");
		$(".error-message").hide();
	});

	// --- validation --- //
	$('button[type=submit]').click(function (){
		$('body').animate({ scrollTop: $('#form_data').offset().top }, 100, function (){
			errors = false;			
			$("input:not([type=checkbox]), textarea").each(checkField);
			if(!errors && $("#agreement").prop("checked")) {
				$('#form_data').submit();
			}
		});
		return false;
	});

	$("input:not([type=checkbox]), textarea").change(checkField);	
});

function checkField() {
	var pattern;
	var $this = $(this);

	switch($this.attr('id')) {
		case "first_name":
		case "last_name":
		case "role":
			pattern = /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/;
			break
		case "email":
			pattern = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;				
			break
		case "phone_country":
			pattern = /^\+\d{2}/;
			break
		case "phone_code":
			pattern = /\d{3}/;	
			break
		case "phone_number":
			pattern = /\d{7}/;
			break
		case "school_org":
		case "goals":
			pattern = /^.{3,}$/;
			break
	}
	
	validate($this, pattern);
}

function validate(elem, pattern) {		
	if (!pattern.test(elem.val())) {
		errors = true;
		elem.removeClass("valid").addClass("invalid");
		elem.parent().removeClass("valid").addClass("invalid");
		elem.next().show();
	} else {
		elem.removeClass("invalid").addClass("valid");
		elem.parent().removeClass("invalid").addClass("valid");
		elem.next().hide();
	}
}