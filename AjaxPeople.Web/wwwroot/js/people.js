$(() => {
    loadPeople();

    $("#add-person").on('click', function () {
        const firstName = $("#first-name").val();
        const lastName = $("#last-name").val();
        const age = $("#age").val();

        $.post("/home/addperson", { firstName, lastName, age }, function () {
            loadPeople();
            $("#first-name").val('');
            $("#last-name").val('');
            $("#age").val('');
        })
    })

    $("#people-table").on('click', "#edit-button", function () {
        const id = $(this).data('id');
        const firstName = $(this).data("firstName");
        const lastName = $(this).data("lastName");
        const age = $(this).data("age");
        $("#person_id").val(id);
        $("#person_first_name").val(firstName);
        $("#person_last_name").val(lastName);
        $("#person_age").val(age);
        $(".edit-person").modal();
       
    })

    $("#save-edit-button").on('click', function () {
        
        console.log("hello");
        const id = $("#person_id").val();
        const firstName = $("#person_first_name").val();
        const lastName = $("#person_last_name").val();
        const age = $("#person_age").val();

        $.post("/home/editperson", { id, firstName, lastName, age }, function () {
            loadPeople();
        })
        $(".edit-person").modal('hide');

    })

    $("#people-table").on('click', "#delete-button", function () {
        console.log("hello");
        const id = $(this).data('id');

        $.post('/home/deleteperson', { id }, function () {
            loadPeople();
        })
    })

    function loadPeople() {
        $.get("/home/getall", function (people) {
            $("#people-table tr:gt(0)").remove();
            people.forEach(person => {
                $("#people-table tbody").append(`
<tr>
    <td>${person.firstName}</td>
    <td>${person.lastName}</td>
    <td>${person.age}</td>
    <td>
        <button data-id="${person.id}" data-first-name="${person.firstName}" 
        data-last-name="${person.lastName}" data-age="${person.age}"
        id = "edit-button" class= "btn btn-info btn-block">Edit</button >
    </td>
    <td>
        <button data-id="${person.id}" id="delete-button" class="btn btn-danger btn-block">Delete</button>
    </td>
</tr>`)
            })
        })
    }


});