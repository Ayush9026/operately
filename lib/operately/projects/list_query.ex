defmodule Operately.Projects.ListQuery do
  import Ecto.Query, warn: false

  alias Operately.Projects.Project
  alias Operately.Alignments.Alignment

  def build(filters) do
    query = from p in Project

    query = apply_group_filter(query, filters[:group_id])
    query = apply_objective_filter(query, filters[:objective_id])

    query
  end

  #
  # Filter by group if the filter is present
  #
  defp apply_group_filter(query, nil) do
    query
  end

  defp apply_group_filter(query, group_id) do
    from p in query, where: p.group_id == ^group_id
  end

  #
  # Filter by objective if the filter is present
  #
  defp apply_objective_filter(query, nil) do
    query
  end

  defp apply_objective_filter(query, objective_id) do
    from p in query,
      join: a in Alignment, on: p.id == a.child and a.child_type == :project,
      where: a.parent == ^objective_id and a.parent_type == :objective
  end

end