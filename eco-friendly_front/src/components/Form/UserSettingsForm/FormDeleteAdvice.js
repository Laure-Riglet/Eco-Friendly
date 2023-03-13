import Button from '../../Button';

export default function FormDeleteAdvice() {
  let handleSubmit;
  return (
    <div className="modal-form">
      <h5 className="title text-secondary">
        Supprimer définitivement mon conseil
      </h5>
      <p className="text-content text-secondary">
        Êtes-vous sûr de vouloir supprimer définitivement ce conseil ?
      </p>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Button type="submit" color="primary">
          Supprimer
        </Button>
        <Button type="reset">Annuler</Button>
      </form>
    </div>
  );
}
