defmodule Operately.Activities.Content.GoalClosing do
  use Operately.Activities.Content

  embedded_schema do
    field :company_id, :string
    field :space_id, :string
    field :goal_id, :string
  end

  def changeset(attrs) do
    %__MODULE__{}
    |> cast(attrs, __schema__(:fields))
    |> validate_required(__schema__(:fields))
  end

  def build(params) do
    changeset(params)
  end
end
