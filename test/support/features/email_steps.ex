defmodule Operately.Support.Features.EmailSteps do
  alias Operately.FeatureCase.UI
  alias Operately.People.Person

  def assert_project_created_email_sent(ctx, author: author, project: project_name, to: to, role: role) do
    subject = "Operately (#{ctx.company.name}): #{Person.short_name(author)} created the #{project_name} project in Operately and assigned you as a #{role}"

    ctx |> UI.assert_email_sent(subject, to: to.email)
  end

  def assert_project_archived_sent(ctx, author: author, project: project, to: to) do
    subject = "Operately (#{ctx.company.name}): #{Person.short_name(author)} archived the #{project.name} project in Operately"

    ctx |> UI.assert_email_sent(subject, to: to.email)
  end
end
