<template>
<div class="modal fade" id="confirmNavigateAwayModal" tabindex="-1" role="dialog" aria-labelledby="confirmNavigateAwayModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="confirmNavigateAwayModalLabel">Confirm Delete</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                ${modalMessage}
                <div class="modal-footer">
                    <button type="button" click.delegate="delete()" class="btn btn-primary" data-dismiss="modal">Yes</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>